import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UsersService } from './service';
import { User } from './model';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@modules/auth/decorator';
import { RegisterPayload } from '@modules/auth/types';
import { Response } from 'express';
import {UserCreationPayload} from "@modules/user/types";

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

  // @Post('register')
  // async register(
  //   @Body() userCreationPayload: UserCreationPayload,
  //   @Res() res: Response,
  // ): Promise<any> {
  //   const { user } = await this.service.createUserByAdmin(userCreationPayload);
  //   return res.send(user);
  // }
}
