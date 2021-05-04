import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CourseDTO } from './dto';
import { Course } from './model';
import { CourseService } from './service';

@Controller('courses')
export class CourseController {
  constructor(
    private readonly logger: Logger,
    private readonly courseService: CourseService,
  ) {
  }

  @Get()
  find(): Promise<Course[]> {
    try {
      return this.courseService.find()
    } catch (error) {
      this.logger.error(error)
    }
  }

  @Get()
  findById(@Param('id') id: string): Promise<Course> {
    try {
      return this.courseService.findById(id)
    } catch (error) {
      this.logger.error(error)
    }
  }

  @Post()
  createAndSave(@Body() courseDTO: CourseDTO): Promise<Course> {
    try {
      return this.courseService.createAndSave(courseDTO)
    } catch (error) {
      this.logger.error(error)
    }
  }

}
