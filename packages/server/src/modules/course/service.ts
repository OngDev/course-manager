import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseDTO } from './dto';
import { Course } from './model';


@Injectable()
export class CourseService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }


  createAndSave(courseDTO: CourseDTO): Promise<Course> {
    try {
      return this.courseRepository.save(courseDTO)
    } catch (error) {
      this.logger.error(error)
    }
  }

  findAll(): Promise<Course[]> {
    try {
      return this.courseRepository.find()
    } catch (error) {
      this.logger.error(error)
    }
  }

  findById(id: string): Promise<Course> {
    try {
      return this.courseRepository.findOne(id)
    } catch (error) {
      this.logger.error(error)
    }
  }

}
