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

  createAndSave(courseDTO: CourseCreationDTO): Promise<CourseCreationDTO> {
    try {
      return this.courseRepository.save(courseDTO);
    } catch (error) {
      this.logger.error(error);
    }
  }

  findAll(): Promise<CourseCreationDTO[]> {
    try {
      return this.courseRepository.find();
    } catch (error) {
      this.logger.error(error);
    }
  }

  findById(id: string): Promise<CourseCreationDTO> {
    try {
      return this.courseRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }
  async update(
    id: string,
    updateCourseDto: CourseUpdationDTO,
  ): Promise<CourseCreationDTO> {
    try {
      return this.courseRepository.save({ id, ...updateCourseDto });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.courseRepository.delete({ id });
      return true;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
