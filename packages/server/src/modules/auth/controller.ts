import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Req,
  Res,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt';
import { LocalAuthGuard } from './guards/local';
import { AuthService } from './service';
import { RegisterPayload } from './types';
import { ApiTags } from '@nestjs/swagger';
import RequestWithAccount from './interfaces/requestWithUser';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithAccount, @Res() res: Response) {
    const { cookie, user: parsedUser } = await this.authService.login(req.user);
    res.setHeader('Set-Cookie', cookie);
    return res.send(parsedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @HttpCode(200)
  @Post('register')
  async register(
    @Body() registerPayload: RegisterPayload,
    @Res() res: Response,
  ): Promise<any> {
    const { cookie, user } = await this.authService.register(registerPayload);
    res.setHeader('Set-Cookie', cookie);
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    return res.send(user);
  }
}
