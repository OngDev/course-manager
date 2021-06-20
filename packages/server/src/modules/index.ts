import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { FileUploadModule } from './file-upload';
import { LoggerMiddleware } from 'src/common/middlewares/loggerMiddleware';

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
    FileUploadModule,
    ConfigModule.forRoot(),
    Logger,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    Logger,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
