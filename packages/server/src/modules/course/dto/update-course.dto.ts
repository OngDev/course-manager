import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
export class UpdateVideoDto extends PartialType(CreateCourseDto) { }