import { Injectable, NotFoundException } from '@nestjs/common';
import { and, asc, desc, eq } from 'drizzle-orm';
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
    return this.db.select().from(projects).where(where).orderBy(asc(projects.sortOrder), desc(projects.createdAt));
  }

  findAll() {
    return this.db.select().from(projects).orderBy(asc(projects.sortOrder), desc(projects.createdAt));
  }

  async findBySlug(slug: string) {
    const [p] = await this.db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    if (!p || !p.published) throw new NotFoundException();
    return p;
  }

  async findById(id: number) {
    const [p] = await this.db.select().from(projects).where(eq(projects.id, id)).limit(1);
    if (!p) throw new NotFoundException();
    return p;
  }

  async create(dto: UpsertProjectDto) {
    const slug = await this.uniqueSlug(dto.slug || dto.title);
    const [p] = await this.db.insert(projects).values({ ...dto, slug }).returning();
    return p;
  }

  async update(id: number, dto: UpsertProjectDto) {
    await this.findById(id);
    const data: Partial<typeof projects.$inferInsert> = { ...dto, updatedAt: new Date() };
    if (dto.slug) data.slug = await this.uniqueSlug(dto.slug, id);
    const [p] = await this.db.update(projects).set(data).where(eq(projects.id, id)).returning();
    return p;
  }

  async remove(id: number) {
    await this.findById(id);
    await this.db.delete(projects).where(eq(projects.id, id));
    return { ok: true };
  }

  private async uniqueSlug(base: string, excludeId?: number) {
    const root = slugify(base);
    let slug = root;
    for (let i = 2; ; i++) {
      const [hit] = await this.db.select({ id: projects.id }).from(projects).where(eq(projects.slug, slug)).limit(1);
      if (!hit || hit.id === excludeId) return slug;
      slug = `${root}-${i}`;
    }
  }
}
