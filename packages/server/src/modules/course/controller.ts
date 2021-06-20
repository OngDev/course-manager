import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Course, CourseCreationDTO } from './model';
import { CoursesService } from './service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Courses')
@Crud({
  model: {
    type: Course,
  },
  dto: {
    create: CourseCreationDTO,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  // routes: {
  //   createOneBase: {
  //     decorators: [Roles(Role.Admin)],
  //   },
  //   updateOneBase: {
  //     decorators: [Roles(Role.Admin)],
  //   },
  //   deleteOneBase: {
  //     decorators: [Roles(Role.Admin)],
  //   },
  // },
})
@Controller('courses')
export class CoursesController implements CrudController<Course> {
  constructor(public service: CoursesService) {}
}
