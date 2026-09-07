import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { RequirePermissions } from '../auth/permissions.js';
import { DbService } from '../db/db.service.js';
import { settings } from '../db/schema.js';
import type { SiteSettings } from '../db/schema.js';
import { publicSettings, settingsInput } from './settings.input.js';
@Controller('settings')
export class SettingsController {
  constructor(private readonly dbs: DbService) {}
  @Get() async get() {
    const [row] = await this.dbs.db
      .select()
      .from(settings)
      .where(eq(settings.id, 1));
    return row ? publicSettings(row.data) : {};
  }
  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('settings:read')
  admin() {
    return this.get();
  }
  @Put()
  @UseGuards(JwtAuthGuard)
  @RequirePermissions('settings:write')
  async update(@Body() body: unknown) {
    return this.dbs.db.transaction(async (tx) => {
      const [old] = await tx
        .select()
        .from(settings)
        .where(eq(settings.id, 1))
        .for('update');
      const data = settingsInput(body, old?.data ?? ({} as SiteSettings));
      const [row] = await tx
        .insert(settings)
        .values({ id: 1, data })
        .onConflictDoUpdate({
          target: settings.id,
          set: { data, updatedAt: new Date() },
        })
        .returning();
      return publicSettings(row.data);
    });
  }
}
