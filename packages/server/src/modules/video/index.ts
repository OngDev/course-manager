import { Module, Logger, CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { VideosService } from './service';
import { VideoController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './model';
import { CoursesService } from '../course/service';
import { Course } from '../course/model';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Video])],
  controllers: [VideoController],
  providers: [
    VideosService,
    Logger,
    { provide: CACHE_MANAGER, useClass: CacheModule },
    CoursesService,
  ],
  exports: [VideosService],
})
export class VideoModule {}
