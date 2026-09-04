import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard.js';
import { UpsertProjectDto } from './projects.dto.js';
import { ProjectsService } from './projects.service.js';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly svc: ProjectsService) {}

  @Get()
  list(@Query('featured') featured?: string) {
    return this.svc.findPublic(featured === '1' || featured === 'true');
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/all')
  adminList() {
    return this.svc.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  adminOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findById(id);
  }

  @Get(':slug')
  one(@Param('slug') slug: string) {
    return this.svc.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: UpsertProjectDto) {
    return this.svc.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpsertProjectDto) {
    return this.svc.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
