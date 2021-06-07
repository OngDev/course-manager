import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Course } from './model';

@Injectable()
export class CoursesService extends TypeOrmCrudService<Course> {
  constructor(
    @InjectRepository(Course)
    courseRepository: Repository<Course>,
  ) {
    super(courseRepository);
  }
}
