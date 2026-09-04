import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { DbService } from '../db/db.service.js';
import { users } from '../db/schema.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbs: DbService,
    private readonly jwt: JwtService,
  ) {}

  async login(username: string, password: string) {
    const [user] = await this.dbs.db.select().from(users).where(eq(users.username, username)).limit(1);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
    const token = await this.jwt.signAsync({ sub: user.id, username: user.username });
    return { token, user: { id: user.id, username: user.username } };
  }

  async changePassword(userId: number, current: string, next: string) {
    const [user] = await this.dbs.db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user || !(await bcrypt.compare(current, user.passwordHash))) {
      throw new UnauthorizedException('كلمة المرور الحالية غير صحيحة');
    }
    const passwordHash = await bcrypt.hash(next, 10);
    await this.dbs.db.update(users).set({ passwordHash }).where(eq(users.id, userId));
    return { ok: true };
  }
}
