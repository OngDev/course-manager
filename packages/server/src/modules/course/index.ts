import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './controller';
import { Course } from './model';
import { CoursesService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CoursesController],
  providers: [CoursesService, Logger],
  exports: [CoursesService],
})
export class CourseModule {}
