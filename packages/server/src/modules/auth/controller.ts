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

  @HttpCode(200)
  @Get('logout')
  logout(@Res() res: Response) {
    const emptyCookie = this.authService.getEmptyCookie();
    res.setHeader('Set-Cookie', emptyCookie);
    return res.end();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('isLoggedIn')
  isLoggedIn(@Res() res: Response) {
    return res.send(true);
  }

  @HttpCode(200)
  @Post('register')
  async register(
    @Body() registerPayload: RegisterPayload,
    @Res() res: Response,
  ): Promise<any> {
    const { cookie, user } = await this.authService.register(registerPayload);
    res.setHeader('Set-Cookie', cookie);
    return res.send(user);
  }
}
