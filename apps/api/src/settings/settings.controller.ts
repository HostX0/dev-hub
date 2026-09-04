import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { DbService } from '../db/db.service.js';
import { settings } from '../db/schema.js';
import type { SiteSettings } from '../db/schema.js';

@Controller('settings')
export class SettingsController {
  constructor(private readonly dbs: DbService) {}

  @Get()
  async get() {
    const [row] = await this.dbs.db.select().from(settings).where(eq(settings.id, 1)).limit(1);
    return row?.data ?? {};
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() data: SiteSettings) {
    const [row] = await this.dbs.db
      .insert(settings)
      .values({ id: 1, data })
      .onConflictDoUpdate({ target: settings.id, set: { data, updatedAt: new Date() } })
      .returning();
    return row.data;
  }
}
