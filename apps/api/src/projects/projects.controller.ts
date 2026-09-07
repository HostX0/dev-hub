import { RequirePermissions } from '../auth/permissions.js';
import { visibility } from '../common/input.js';
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
  Query,
  UseGuards,
} from '@nestjs/common';
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
  @RequirePermissions('projects:read')
  @Get('admin/all')
  adminList() {
    return this.svc.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions('projects:read')
  @Get('admin/:id')
  adminOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findById(id);
  }

  @Get(':slug')
  one(@Param('slug') slug: string) {
    return this.svc.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions('projects:write')
  @Post()
  create(@Body() dto: UpsertProjectDto) {
    return this.svc.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions('projects:write')
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpsertProjectDto) {
    return this.svc.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions('projects:write')
  @Patch(':id/visibility')
  visibility(@Param('id', ParseIntPipe) id: number, @Body() body: unknown) {
    return this.svc.visibility(id, visibility(body).published);
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions('projects:write')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
