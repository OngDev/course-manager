import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { configService } from '../../../config/config.service';
import { Request } from 'express';
import { AuthService } from '../service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtConfig().secret,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateJwtUser(payload);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
