import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt';
import { LocalAuthGuard } from './guards/local';
import { AuthService } from './service';
import { RegisterPayload } from './types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
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

  @Post('register')
  async register(@Body() registerPayload: RegisterPayload): Promise<any> {
    return await this.authService.register(registerPayload);
  }
}
