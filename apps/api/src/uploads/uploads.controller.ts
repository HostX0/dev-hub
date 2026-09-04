import { BadRequestException, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
import { randomBytes } from 'node:crypto';
import { JwtAuthGuard } from '../auth/jwt.guard.js';

const ALLOWED = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif'];

@Controller('uploads')
export class UploadsController {
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 },
      storage: diskStorage({
        destination: 'uploads',
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname).toLowerCase();
          cb(null, `${Date.now()}-${randomBytes(4).toString('hex')}${ext}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        const ok = ALLOWED.includes(extname(file.originalname).toLowerCase());
        cb(ok ? null : new BadRequestException('نوع الملف غير مدعوم'), ok);
      },
    }),
  )
  upload(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('لم يتم إرسال ملف');
    return { url: `/uploads/${file.filename}` };
  }
}
