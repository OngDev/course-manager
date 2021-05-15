import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './model';
import { CourseCreationDTO } from './dto/create-course.dto';
import { CourseUpdationDTO } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  createAndSave(courseDTO: CourseCreationDTO): Promise<Course> {
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
  async update(
    id: string,
    updateCourseDto: CourseUpdationDTO,
  ): Promise<Course> {
    try {
      await this.courseRepository.update({ id }, { ...updateCourseDto });
      return this.courseRepository.findOne({ id });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async remove(id: string): Promise<any> {
    try {
      await this.courseRepository.delete({ id });
      return { message: 'ok' };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
