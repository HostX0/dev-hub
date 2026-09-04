import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { desc, eq, sql } from 'drizzle-orm';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { DbService } from '../db/db.service.js';
import { messages } from '../db/schema.js';

class CreateMessageDto {
  @IsString() @MinLength(2) @MaxLength(120) name: string;
  @IsEmail() @MaxLength(160) email: string;
  @IsOptional() @IsString() @MaxLength(200) subject?: string;
  @IsString() @MinLength(5) @MaxLength(4000) body: string;
}

@Controller('messages')
export class MessagesController {
  constructor(private readonly dbs: DbService) {}

  @Post()
  async create(@Body() dto: CreateMessageDto) {
    await this.dbs.db.insert(messages).values(dto);
    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  list() {
    return this.dbs.db.select().from(messages).orderBy(desc(messages.createdAt));
  }

  @UseGuards(JwtAuthGuard)
  @Get('unread-count')
  async unread() {
    const [r] = await this.dbs.db
      .select({ count: sql<number>`count(*)::int` })
      .from(messages)
      .where(eq(messages.read, false));
    return { count: r?.count ?? 0 };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/read')
  async markRead(@Param('id', ParseIntPipe) id: number) {
    await this.dbs.db.update(messages).set({ read: true }).where(eq(messages.id, id));
    return { ok: true };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.dbs.db.delete(messages).where(eq(messages.id, id));
    return { ok: true };
  }
}
