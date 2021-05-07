import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './model';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  createAndSave(courseDTO: CreateCourseDto): Promise<Course> {
    try {
      return this.courseRepository.save(courseDTO);
    } catch (error) {
      this.logger.error(error);
    }
  }

  findAll(): Promise<Course[]> {
    try {
      return this.courseRepository.find();
    } catch (error) {
      this.logger.error(error);
    }
  }

  findById(id: string): Promise<Course> {
    try {
      return this.courseRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
