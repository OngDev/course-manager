import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import Role from './model';
import { RolesService } from './service';

@ApiTags('Roles')
@Crud({
  model: {
    type: Role,
  },
})
@Controller('roles')
export class RolesController implements CrudController<Role> {
  constructor(public service: RolesService) {}
}
