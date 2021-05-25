import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt';
import { LocalAuthGuard } from './guards/local';
import { AuthService } from './service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
