import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { AuthModule } from './auth/auth.module.js';
import { DbModule } from './db/db.module.js';
import { MessagesModule } from './messages/messages.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { SeedModule } from './seed/seed.module.js';
import { ServicesModule } from './services/services.module.js';
import { SettingsModule } from './settings/settings.module.js';
import { UploadsModule } from './uploads/uploads.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: { index: false, maxAge: '7d' },
    }),
    DbModule,
    AuthModule,
    ProjectsModule,
    ServicesModule,
    MessagesModule,
    SettingsModule,
    UploadsModule,
    SeedModule,
  ],
})
export class AppModule {}
