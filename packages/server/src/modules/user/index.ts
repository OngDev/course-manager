import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller';
import { Admin, Mod, Supporter, User } from './model';
import { UsersService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin, Mod, Supporter])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UserModule {}
