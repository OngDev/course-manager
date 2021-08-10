import { Controller } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
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
  query: {
    join: {
      videos: {
        allow: undefined,
      },
    },
  },
})
@Controller('courses')
export class CoursesController implements CrudController<Course> {
  constructor(public service: CoursesService) {}

  get base(): CrudController<Course> {
    return this;
  }
}
