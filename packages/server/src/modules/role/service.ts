import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import Role from './model';

@Injectable()
export class RolesService extends TypeOrmCrudService<Role> {
  constructor(
    @InjectRepository(Role)
    repo: Repository<Role>,
  ) {
    super(repo);
  }

  async getRolesByRolesStrArr(roles: string[]): Promise<Role[]> {
    return await this.repo.find({
      where: {
        name: In(roles),
      },
    });
  }
}
