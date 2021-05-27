import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin, Mod, Supporter, User } from './model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin, Mod, Supporter])],
})
export class VideoModule {}
