import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { asc, eq, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { DbService } from '../db/db.service.js';
import { users } from '../db/schema.js';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import {
  PERMISSIONS,
  RequirePermissions,
  hasPermission,
  userFields,
} from '../auth/permissions.js';
import type { PublicUser } from '../auth/permissions.js';
import {
  object,
  str,
  bool,
  password,
  nonEmpty,
  strings,
} from '../common/input.js';

function validate(value: unknown, create: boolean) {
  const raw = object(value, [
    'username',
    'displayName',
    'password',
    'role',
    'permissions',
    'active',
  ]);
  const d: Record<string, any> = {};
  for (const k of ['username', 'displayName'])
    if (raw[k] !== undefined)
      d[k] = str(raw[k], k === 'username' ? 64 : 120, true);
  if (d.username && !/^[a-zA-Z0-9_.-]{3,64}$/.test(d.username))
    throw new BadRequestException('Invalid username');
  if (raw.password !== undefined) d.password = password(raw.password);
  if (raw.role !== undefined) {
    if (!['owner', 'admin'].includes(raw.role))
      throw new BadRequestException('Invalid role');
    d.role = raw.role;
  }
  if (raw.permissions !== undefined) {
    const ps = strings(raw.permissions, PERMISSIONS.length, 32);
    if (ps.some((p) => !PERMISSIONS.includes(p)))
      throw new BadRequestException('Invalid permission');
    d.permissions = [
      ...new Set(
        ps.flatMap((p) =>
          p.endsWith(':write') ? [p, p.replace(':write', ':read')] : [p],
        ),
      ),
    ].sort();
  }
  if (raw.active !== undefined) d.active = bool(raw.active);
  if (create && (!d.username || !d.password))
    throw new BadRequestException('Username and password are required');
  nonEmpty(d);
  return d;
}
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly dbs: DbService) {}
  @Get()
  @RequirePermissions('users:read')
  list() {
    return this.dbs.db.select(userFields).from(users).orderBy(asc(users.id));
  }
  @Get(':id')
  @RequirePermissions('users:read')
  async one(@Param('id', ParseIntPipe) id: number) {
    const [user] = await this.dbs.db
      .select(userFields)
      .from(users)
      .where(eq(users.id, id));
    if (!user) throw new NotFoundException();
    return user;
  }
  @Post()
  @RequirePermissions('users:write')
  create(@Req() req: any, @Body() body: unknown) {
    return this.save(req.user.id, undefined, validate(body, true));
  }
  @Put(':id')
  @RequirePermissions('users:write')
  update(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: unknown,
  ) {
    return this.save(req.user.id, id, validate(body, false));
  }
  @Patch(':id')
  @RequirePermissions('users:write')
  patch(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: unknown,
  ) {
    return this.update(req, id, body);
  }
  @Delete(':id')
  @RequirePermissions('users:write')
  async remove(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    await this.save(req.user.id, id, { active: false });
    return { ok: true };
  }
  private async save(
    actorId: number,
    id: number | undefined,
    data: Record<string, any>,
  ) {
    if (data.password !== undefined) {
      data.passwordHash = await bcrypt.hash(data.password, 12);
      delete data.password;
    }
    return this.dbs.db.transaction(async (tx) => {
      // Serializes owner-count checks and concurrent privilege changes.
      await tx.execute(sql`SELECT pg_advisory_xact_lock(762911)`);
      const [actor] = await tx
        .select()
        .from(users)
        .where(eq(users.id, actorId));
      if (!actor || !hasPermission(actor, 'users:write'))
        throw new ForbiddenException();
      const [existing] =
        id === undefined
          ? []
          : await tx.select().from(users).where(eq(users.id, id));
      if (id !== undefined && !existing) throw new NotFoundException();
      const next = {
        role: existing?.role ?? 'admin',
        permissions: existing?.permissions ?? [],
        active: existing?.active ?? true,
        ...data,
      } as PublicUser;
      if (actor.role !== 'owner') {
        if (
          existing?.role === 'owner' ||
          next.role === 'owner' ||
          (existing?.permissions ?? []).some((p) => !hasPermission(actor, p)) ||
          next.permissions.some((p) => !hasPermission(actor, p))
        )
          throw new ForbiddenException(
            'Cannot grant or manage privileges above your own',
          );
      }
      if (
        id === actorId &&
        (next.role !== actor.role ||
          next.active !== actor.active ||
          (data.permissions !== undefined &&
            JSON.stringify([...data.permissions].sort()) !==
              JSON.stringify([...actor.permissions].sort())))
      )
        throw new BadRequestException(
          'Cannot change your own role, permissions or active status',
        );
      if (
        existing?.role === 'owner' &&
        existing.active &&
        (!next.active || next.role !== 'owner')
      ) {
        const owners = await tx
          .select({ id: users.id })
          .from(users)
          .where(sql`${users.role} = 'owner' AND ${users.active} = true`);
        if (owners.length <= 1)
          throw new ConflictException('At least one active owner is required');
      }
      if (data.username) {
        const [hit] = await tx
          .select({ id: users.id })
          .from(users)
          .where(eq(users.username, data.username));
        if (hit && hit.id !== id)
          throw new ConflictException('Username already exists');
      }
      if (existing) {
        if (data.passwordHash || data.active === false)
          data.tokenVersion = sql`${users.tokenVersion} + 1`;
        const [user] = await tx
          .update(users)
          .set(data)
          .where(eq(users.id, existing.id))
          .returning(userFields);
        return user;
      }
      const [user] = await tx
        .insert(users)
        .values({
          username: data.username,
          passwordHash: data.passwordHash,
          displayName: data.displayName ?? data.username,
          role: next.role,
          permissions: next.permissions,
          active: next.active,
        })
        .returning(userFields);
      return user;
    });
  }
}
