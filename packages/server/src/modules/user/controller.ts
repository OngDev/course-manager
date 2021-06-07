import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UsersService } from './service';
import { User } from './model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Crud({
  model: {
    type: User,
  },
  query: {
    join: {
      account: {
        eager: true,
        allow: ['username'],
        exclude: ['id'],
      },
      roles: {
        eager: true,
        allow: ['name'],
        exclude: ['id'],
      },
    },
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
