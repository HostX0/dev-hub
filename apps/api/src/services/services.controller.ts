import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { IsArray, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { asc, eq } from 'drizzle-orm';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { DbService } from '../db/db.service.js';
import { services } from '../db/schema.js';

class UpsertServiceDto {
  @IsString() @MaxLength(160) title: string;
  @IsOptional() @IsString() @MaxLength(160) titleEn?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() descriptionEn?: string;
  @IsOptional() @IsString() @MaxLength(60) icon?: string;
  @IsOptional() @IsArray() features?: string[];
  @IsOptional() @IsArray() featuresEn?: string[];
  @IsOptional() @IsInt() sortOrder?: number;
}

@Controller('services')
export class ServicesController {
  constructor(private readonly dbs: DbService) {}

  @Get()
  list() {
    return this.dbs.db.select().from(services).orderBy(asc(services.sortOrder), asc(services.id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: UpsertServiceDto) {
    const [s] = await this.dbs.db.insert(services).values(dto).returning();
    return s;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpsertServiceDto) {
    const [s] = await this.dbs.db.update(services).set(dto).where(eq(services.id, id)).returning();
    return s;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.dbs.db.delete(services).where(eq(services.id, id));
    return { ok: true };
  }
}
