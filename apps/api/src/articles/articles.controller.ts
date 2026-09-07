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
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { and, asc, eq, sql } from 'drizzle-orm';
import { DbService } from '../db/db.service.js';
import { articles } from '../db/schema.js';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { RequirePermissions } from '../auth/permissions.js';
import { visibility } from '../common/input.js';
import { articleInput, assertPublishable } from './articles.input.js';
@Controller('articles')
export class ArticlesController {
  constructor(private readonly dbs: DbService) {}
  @Get() list() {
    return this.dbs.db
      .select()
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(asc(articles.sortOrder), asc(articles.id));
  }
  @Get('admin/all')
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('articles:read')
  all() {
    return this.dbs.db
      .select()
      .from(articles)
      .orderBy(asc(articles.sortOrder), asc(articles.id));
  }
  @Get('admin/:id')
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('articles:read')
  async adminOne(@Param('id', ParseIntPipe) id: number) {
    const [a] = await this.dbs.db
      .select()
      .from(articles)
      .where(eq(articles.id, id));
    if (!a) throw new NotFoundException();
    return a;
  }
  @Get(':slug') async one(@Param('slug') slug: string) {
    const [a] = await this.dbs.db
      .select()
      .from(articles)
      .where(and(eq(articles.slug, slug), eq(articles.published, true)));
    if (!a) throw new NotFoundException();
    return a;
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('articles:write')
  async create(@Body() body: unknown) {
    const data = articleInput(body);
    return this.dbs.db.transaction(async (tx) => {
      await tx.execute(sql`SELECT pg_advisory_xact_lock(762913)`);
      const [exists] = await tx
        .select({ id: articles.id })
        .from(articles)
        .where(eq(articles.slug, data.slug));
      if (exists) throw new ConflictException('Slug already exists');
      const [a] = await tx.insert(articles).values(data).returning();
      return a;
    });
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('articles:write')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: unknown) {
    const data = articleInput(body);
    return this.dbs.db.transaction(async (tx) => {
      await tx.execute(sql`SELECT pg_advisory_xact_lock(762913)`);
      const [old] = await tx.select().from(articles).where(eq(articles.id, id));
      if (!old) throw new NotFoundException();
      if (data.published ?? old.published) assertPublishable(data.translations);
      const [duplicate] = await tx
        .select({ id: articles.id })
        .from(articles)
        .where(eq(articles.slug, data.slug));
      if (duplicate && duplicate.id !== id)
        throw new ConflictException('Slug already exists');
      const [a] = await tx
        .update(articles)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(articles.id, id))
        .returning();
      return a;
    });
  }
  @Patch(':id/visibility')
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('articles:write')
  async visibility(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: unknown,
  ) {
    const data = visibility(body);
    return this.dbs.db.transaction(async (tx) => {
      await tx.execute(sql`SELECT pg_advisory_xact_lock(762913)`);
      const [old] = await tx.select().from(articles).where(eq(articles.id, id));
      if (!old) throw new NotFoundException();
      if (data.published) assertPublishable(old.translations);
      const [a] = await tx
        .update(articles)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(articles.id, id))
        .returning();
      return a;
    });
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('articles:write')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const rows = await this.dbs.db
      .delete(articles)
      .where(eq(articles.id, id))
      .returning({ id: articles.id });
    if (!rows.length) throw new NotFoundException();
    return { ok: true };
  }
}
