import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { eq } from 'drizzle-orm';
import { DbService } from '../db/db.service.js';
import { users } from '../db/schema.js';
import { hasPermission, PERMISSION_META, safeUser } from './permissions.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly dbs: DbService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const header = req.headers.authorization;
    const token =
      typeof header === 'string' && header.startsWith('Bearer ')
        ? header.slice(7)
        : undefined;
    if (!token) throw new UnauthorizedException();
    let payload: { sub: number; tv?: number };
    try {
      payload = await this.jwt.verifyAsync(token);
    } catch {
      throw new UnauthorizedException();
    }
    if (!Number.isInteger(payload.sub)) throw new UnauthorizedException();
    const [user] = await this.dbs.db
      .select()
      .from(users)
      .where(eq(users.id, payload.sub))
      .limit(1);
    if (!user || !user.active || (payload.tv ?? 0) !== user.tokenVersion)
      throw new UnauthorizedException();
    req.user = { ...safeUser(user), sub: user.id };
    const rule = this.reflector.getAllAndOverride<{
      permissions: string[];
      any: boolean;
    }>(PERMISSION_META, [ctx.getHandler(), ctx.getClass()]);
    if (
      rule &&
      !(rule.any
        ? rule.permissions.some((p) => hasPermission(user, p))
        : rule.permissions.every((p) => hasPermission(user, p)))
    )
      throw new ForbiddenException('Permission denied');
    return true;
  }
}
