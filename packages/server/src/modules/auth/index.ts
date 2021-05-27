import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AccountModule } from '../account';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local';
import { JwtModule } from '@nestjs/jwt';
import { configService } from '../../config/config.service';
import { JwtStrategy } from './strategies/jwt';

@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register(configService.getJwtConfig()),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, Logger],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
