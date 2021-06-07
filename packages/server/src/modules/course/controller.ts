import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Course } from './model';
import { CoursesService } from './service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@modules/auth/decorator';
import { Role } from '@modules/auth/types';

@ApiTags('Courses')
@Crud({
  model: {
    type: Course,
  },
  routes: {
    only: [
      'createOneBase',
      'deleteOneBase',
      'getOneBase',
      'updateOneBase',
      'getManyBase',
    ],
    createOneBase: {
      decorators: [Roles(Role.Admin)],
    },
  },
})
@Controller('courses')
export class CoursesController implements CrudController<Course> {
  constructor(public service: CoursesService) {}
}
