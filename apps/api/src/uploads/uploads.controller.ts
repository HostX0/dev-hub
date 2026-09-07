import { readFile, unlink } from 'node:fs/promises';
import { RequireAnyPermission } from '../auth/permissions.js';
import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
import { randomBytes } from 'node:crypto';
import { JwtAuthGuard } from '../auth/jwt.guard.js';

const ALLOWED = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'];

@Controller('uploads')
export class UploadsController {
  @UseGuards(JwtAuthGuard)
  @RequireAnyPermission(
    'projects:write',
    'services:write',
    'articles:write',
    'settings:write',
  )
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
  async upload(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('لم يتم إرسال ملف');
    const bytes = await readFile(file.path);
    const ext = extname(file.filename).toLowerCase();
    const valid =
      ext === '.png'
        ? bytes
            .subarray(0, 8)
            .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
        : ['.jpg', '.jpeg'].includes(ext)
          ? bytes.length >= 3 &&
            bytes[0] === 255 &&
            bytes[1] === 216 &&
            bytes[2] === 255
          : ext === '.gif'
            ? ['GIF87a', 'GIF89a'].includes(bytes.toString('ascii', 0, 6))
            : ext === '.webp'
              ? bytes.toString('ascii', 0, 4) === 'RIFF' &&
                bytes.toString('ascii', 8, 12) === 'WEBP'
              : ext === '.avif'
                ? bytes.toString('ascii', 4, 8) === 'ftyp' &&
                  /avif|avis/.test(bytes.toString('ascii', 8, 64))
                : false;
    if (!valid) {
      await unlink(file.path);
      throw new BadRequestException(
        'File content does not match a supported image type',
      );
    }
    return { url: `/uploads/${file.filename}` };
  }
}
