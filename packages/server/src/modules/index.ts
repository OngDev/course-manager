import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExampleModule } from './example';
import { configService } from '../config/config.service';
import { CourseModule } from './course';
<<<<<<< HEAD
import { VideoModule } from './video';
=======
import { SubtitlesModule } from './subtitles/subtitles.module';
>>>>>>> add subtitle module

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ExampleModule,
    CourseModule,
<<<<<<< HEAD
    VideoModule,
=======
    SubtitlesModule,
>>>>>>> add subtitle module
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
