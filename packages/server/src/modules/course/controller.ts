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
})
@Controller('courses')
export class CoursesController implements CrudController<Course> {
  constructor(public service: CoursesService) {}

  get base(): CrudController<Course> {
    return this;
  }

  @Override()
  async getMany(
    @ParsedRequest() req: CrudRequest,
  ): Promise<GetManyDefaultResponse<Course> | Course[]> {
    req.options.query.join = {
      videos: {
        eager: true,
      },
    };
    const baseRes = await this.base.getManyBase(req);
    baseRes['data'] = baseRes['data'].map((item) => {
      const { videos, ...rest } = item;
      return {
        ...rest,
        videoCount: videos.length,
      };
    });
    return baseRes;
  }
}
