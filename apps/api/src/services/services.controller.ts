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
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { asc, eq } from 'drizzle-orm';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { RequirePermissions } from '../auth/permissions.js';
import { DbService } from '../db/db.service.js';
import { services } from '../db/schema.js';
import {
  serviceInput,
  translatedPublication,
} from '../common/content.input.js';
import { visibility } from '../common/input.js';
@Controller('services')
export class ServicesController {
  constructor(private readonly dbs: DbService) {}
  @Get() list() {
    return this.dbs.db
      .select()
      .from(services)
      .where(eq(services.published, true))
      .orderBy(asc(services.sortOrder), asc(services.id));
  }
  @Get('admin/all')
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('services:read')
  all() {
    return this.dbs.db
      .select()
      .from(services)
      .orderBy(asc(services.sortOrder), asc(services.id));
  }
  @Get('admin/:id')
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('services:read')
  async one(@Param('id', ParseIntPipe) id: number) {
    const [s] = await this.dbs.db
      .select()
      .from(services)
      .where(eq(services.id, id));
    if (!s) throw new NotFoundException();
    return s;
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('services:write')
  async create(@Body() body: unknown) {
    const data = serviceInput(body);
    if (data.published) translatedPublication(data);
    const [s] = await this.dbs.db
      .insert(services)
      .values({ title: '', ...data })
      .returning();
    return s;
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('services:write')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: unknown) {
    const data = serviceInput(body);
    return this.dbs.db.transaction(async (tx) => {
      const [old] = await tx
        .select()
        .from(services)
        .where(eq(services.id, id))
        .for('update');
      if (!old) throw new NotFoundException();
      if (data.published ?? old.published)
        translatedPublication({ ...old, ...data });
      const [s] = await tx
        .update(services)
        .set(data)
        .where(eq(services.id, id))
        .returning();
      return s;
    });
  }
  @Patch(':id/visibility')
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('services:write')
  visibility(@Param('id', ParseIntPipe) id: number, @Body() body: unknown) {
    return this.update(id, visibility(body));
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('services:write')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const rows = await this.dbs.db
      .delete(services)
      .where(eq(services.id, id))
      .returning({ id: services.id });
    if (!rows.length) throw new NotFoundException();
    return { ok: true };
  }
}
