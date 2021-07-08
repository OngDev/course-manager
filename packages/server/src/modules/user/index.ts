import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller';
import { Admin, Mod, Supporter, User } from './model';
import { UsersService } from './service';
import { AccountModule } from '@modules/account';
import { RoleModule } from '@modules/role';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin, Mod, Supporter]),
    AccountModule,
    RoleModule,
  ],
  providers: [UsersService, Logger],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UserModule {}
