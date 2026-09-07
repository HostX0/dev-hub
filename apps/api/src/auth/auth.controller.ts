import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { IsString, MinLength, MaxLength } from 'class-validator';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt.guard.js';

class LoginDto {
  @IsString() @MaxLength(64) username: string;
  @IsString() @MaxLength(72) password: string;
}
class ChangePasswordDto {
  @IsString() @MaxLength(72) current: string;
  @IsString() @MinLength(8) @MaxLength(72) next: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.username, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    const { sub: _sub, ...user } = req.user;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
    return this.auth.changePassword(req.user.sub, dto.current, dto.next);
  }
}
