import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExampleModule } from './example';
import { configService } from '../config/config.service';
import { CourseModule } from './course';
import { VideoModule } from './video';
import { SubtitlesModule } from './subtitles';
import { CommentsModule } from './comments';
import { UserModule } from './user';
import { SubLinesModule } from './sub-lines';
import { CommentReactionsModule } from './comment-reactions';
import { AuthModule } from './auth';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ExampleModule,
    CourseModule,
    VideoModule,
    SubtitlesModule,
    CommentsModule,
    UserModule,
    SubLinesModule,
    CommentReactionsModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
