import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import Role from './model';

@Injectable()
export class RolesService extends TypeOrmCrudService<Role> {
  constructor(
    @InjectRepository(Role)
    roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }
}
