import { PartialType } from '@nestjs/mapped-types';
import { CourseCreationDTO } from './create-course.dto';
export class CourseUpdationDTO extends PartialType(CourseCreationDTO) { }
