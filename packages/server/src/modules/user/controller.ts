import { Body, Controller, Post, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UsersService } from './service';
import { User } from './model';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserCreationPayload } from '@modules/user/types';

@ApiTags('Users')
@Crud({
  model: {
    type: User,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      account: {
        allow: ['username'],
      },
      roles: {
        allow: ['name'],
      },
    },
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @Post('create')
  async register(
    @Body() userCreationPayload: UserCreationPayload,
    @Res() res: Response,
  ): Promise<any> {
    const { user } = await this.service.createUserByAdmin(userCreationPayload);
    return res.send(user);
  }
}
