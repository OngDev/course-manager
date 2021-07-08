import { Module, Logger } from '@nestjs/common';
import { AuthService } from './service';
import { AccountModule } from '../account';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local';
import { JwtModule } from '@nestjs/jwt';
import { configService } from '../../config/config.service';
import { JwtStrategy } from './strategies/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import Role from '../role/model';
import { AuthController } from './controller';
import Account from '@modules/account/model';
import { RolesGuard } from './guards/role';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from '@modules/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Account]),
    AccountModule,
    UserModule,
    PassportModule,
    JwtModule.register(configService.getJwtConfig()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    Logger,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
