import { password as validatePassword } from '../common/input.js';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { and, eq, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { DbService } from '../db/db.service.js';
import { safeUser } from './permissions.js';
import { users } from '../db/schema.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbs: DbService,
    private readonly jwt: JwtService,
  ) {}

  async login(username: string, password: string) {
    const [user] = await this.dbs.db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    if (
      !user ||
      !user.active ||
      !(await bcrypt.compare(password, user.passwordHash))
    ) {
      throw new UnauthorizedException('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
    const token = await this.jwt.signAsync({
      sub: user.id,
      tv: user.tokenVersion,
    });
    return { token, user: safeUser(user) };
  }

  async changePassword(userId: number, current: string, next: string) {
    const [user] = await this.dbs.db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    if (
      !user ||
      !user.active ||
      !(await bcrypt.compare(current, user.passwordHash))
    ) {
      throw new UnauthorizedException('كلمة المرور الحالية غير صحيحة');
    }
    const passwordHash = await bcrypt.hash(validatePassword(next), 12);
    // Password hashing can overlap an owner reset or another password change. Only
    // replace the version that was actually authenticated, and revoke every older token.
    const changed = await this.dbs.db
      .update(users)
      .set({ passwordHash, tokenVersion: sql`${users.tokenVersion} + 1` })
      .where(
        and(
          eq(users.id, userId),
          eq(users.passwordHash, user.passwordHash),
          eq(users.tokenVersion, user.tokenVersion),
          eq(users.active, true),
        ),
      )
      .returning({ id: users.id });
    if (!changed.length)
      throw new UnauthorizedException(
        'تغيّرت بيانات الحساب، سجّل الدخول وحاول مجدداً',
      );
    return { ok: true };
  }
}
