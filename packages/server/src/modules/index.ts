import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExampleModule } from './example';
import { configService } from '../config/config.service';
import { CourseModule } from './course';
import { VideoModule } from './video';
import { SubtitlesModule } from './subtitles/subtitles.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ExampleModule,
    CourseModule,
    VideoModule,
    SubtitlesModule,
    CommentsModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
