import { Controller, Logger } from '@nestjs/common';
import {
  Crud,
  CrudController,
  Override,
  CrudRequest,
  ParsedRequest,
  GetManyDefaultResponse,
} from '@nestjsx/crud';
import { UsersService } from './service';
import { User } from './model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Crud({
  model: {
    type: User,
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService, private readonly logger: Logger) {}

  get base(): CrudController<User> {
    return this;
  }

  @Override()
  async getMany(
    @ParsedRequest() req: CrudRequest,
  ): Promise<GetManyDefaultResponse<User> | User[]> {
    req.options.query.join = {
      account: {
        allow: ['username'],
        eager: true,
      },
      roles: {
        allow: ['name'],
        eager: true,
      },
    };
    const baseRes = await this.base.getManyBase(req);
    baseRes['data'] = baseRes['data'].map((item) => {
      const { account, roles, ...rest } = item;
      return {
        ...rest,
        username: account.username,
        roles: roles.map((role) => role['name']).join(','),
      };
    });
    this.logger.log(baseRes['data']);
    return baseRes;
  }
}
