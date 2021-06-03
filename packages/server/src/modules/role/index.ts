import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Role from './model';
import RoleService from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
