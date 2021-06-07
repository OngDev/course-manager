import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Course } from './model';
import { CoursesService } from './service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Courses')
@Crud({
  model: {
    type: Course,
  },
})
@Controller('courses')
export class CoursesController implements CrudController<Course> {
  constructor(public service: CoursesService) {}
}
