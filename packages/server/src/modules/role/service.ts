import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Role from './model';

@Injectable()
export default class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(name: string, createdBy: string) {
    await this.roleRepository.save({ name, createdBy, updatedBy: createdBy });
  }
}
