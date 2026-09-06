import {
  validateProjectFields,
  translatedPublication,
} from '../common/content.input.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { DbService } from '../db/db.service.js';
import { projects } from '../db/schema.js';
import { UpsertProjectDto } from './projects.dto.js';

export function slugify(input: string) {
  const s = input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  return s || `project-${Date.now()}`;
}

@Injectable()
export class ProjectsService {
  constructor(private readonly dbs: DbService) {}
  private get db() {
    return this.dbs.db;
  }

  findPublic(featured?: boolean) {
    const where = featured
      ? and(eq(projects.published, true), eq(projects.featured, true))
      : eq(projects.published, true);
    return this.db
      .select()
      .from(projects)
      .where(where)
      .orderBy(asc(projects.sortOrder), desc(projects.createdAt));
  }

  findAll() {
    return this.db
      .select()
      .from(projects)
      .orderBy(asc(projects.sortOrder), desc(projects.createdAt));
  }

  async findBySlug(slug: string) {
    const [p] = await this.db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .limit(1);
    if (!p || !p.published) throw new NotFoundException();
    return p;
  }

  async findById(id: number) {
    const [p] = await this.db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);
    if (!p) throw new NotFoundException();
    return p;
  }

  async create(dto: UpsertProjectDto) {
    validateProjectFields(dto);
    if (dto.published) translatedPublication(dto);
    return this.db.transaction(async (tx) => {
      await tx.execute(sql`SELECT pg_advisory_xact_lock(762914)`);
      const slug = await this.uniqueSlug(dto.slug || dto.title, undefined, tx);
      const [p] = await tx
        .insert(projects)
        .values({ ...dto, slug, published: dto.published ?? false })
        .returning();
      return p;
    });
  }

  async update(id: number, dto: UpsertProjectDto) {
    validateProjectFields(dto);
    return this.db.transaction(async (tx) => {
      await tx.execute(sql`SELECT pg_advisory_xact_lock(762914)`);
      const [old] = await tx
        .select()
        .from(projects)
        .where(eq(projects.id, id))
        .for('update');
      if (!old) throw new NotFoundException();
      if (dto.published ?? old.published)
        translatedPublication({ ...old, ...dto });
      const data: Partial<typeof projects.$inferInsert> = {
        ...dto,
        updatedAt: new Date(),
      };
      if (dto.slug) data.slug = await this.uniqueSlug(dto.slug, id, tx);
      const [p] = await tx
        .update(projects)
        .set(data)
        .where(eq(projects.id, id))
        .returning();
      return p;
    });
  }

  async visibility(id: number, published: boolean) {
    return this.db.transaction(async (tx) => {
      await tx.execute(sql`SELECT pg_advisory_xact_lock(762914)`);
      const [old] = await tx
        .select()
        .from(projects)
        .where(eq(projects.id, id))
        .for('update');
      if (!old) throw new NotFoundException();
      if (published) translatedPublication(old);
      const [p] = await tx
        .update(projects)
        .set({ published, updatedAt: new Date() })
        .where(eq(projects.id, id))
        .returning();
      return p;
    });
  }

  async remove(id: number) {
    await this.findById(id);
    await this.db.delete(projects).where(eq(projects.id, id));
    return { ok: true };
  }

  private async uniqueSlug(
    base: string,
    excludeId?: number,
    db: Pick<DbService['db'], 'select'> = this.db,
  ) {
    const root = slugify(base).slice(0, 110);
    let slug = root;
    for (let i = 2; ; i++) {
      const [hit] = await db
        .select({ id: projects.id })
        .from(projects)
        .where(eq(projects.slug, slug))
        .limit(1);
      if (!hit || hit.id === excludeId) return slug;
      slug = `${root}-${i}`;
    }
  }
}
