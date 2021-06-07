import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExampleModule } from './example';
import { configService } from '../config/config.service';
import { CourseModule } from './course';
import { VideoModule } from './video';
import { SubtitlesModule } from './subtitles';
import { CommentsModule } from './comments';
import { SubLinesModule } from './sub-lines';
import { CommentReactionsModule } from './comment-reactions';
import { AuthModule } from './auth';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ExampleModule,
    CourseModule,
    VideoModule,
    SubtitlesModule,
    CommentsModule,
    SubLinesModule,
    CommentReactionsModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
