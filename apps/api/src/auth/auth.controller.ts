import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt.guard.js';

class LoginDto {
  @IsString() username: string;
  @IsString() password: string;
}
class ChangePasswordDto {
  @IsString() current: string;
  @IsString() @MinLength(8) next: string;
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
    return { id: req.user.sub, username: req.user.username };
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
    return this.auth.changePassword(req.user.sub, dto.current, dto.next);
  }
}
