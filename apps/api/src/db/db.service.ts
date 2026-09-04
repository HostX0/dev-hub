import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import * as schema from './schema.js';

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DbService.name);
  private pool: Pool;
  public db: NodePgDatabase<typeof schema>;

  constructor(private readonly config: ConfigService) {
    this.pool = new Pool({ connectionString: this.config.getOrThrow<string>('DATABASE_URL') });
    this.db = drizzle(this.pool, { schema });
  }

  async onModuleInit() {
    await this.waitForDb();
    await migrate(this.db, { migrationsFolder: 'drizzle' });
    this.logger.log('Database ready & migrated');
  }

  private async waitForDb(retries = 20) {
    for (let i = 1; i <= retries; i++) {
      try {
        await this.pool.query('select 1');
        return;
      } catch (e) {
        this.logger.warn(`DB not ready (attempt ${i}/${retries})...`);
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
    throw new Error('Could not connect to database');
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
