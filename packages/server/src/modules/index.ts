import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExampleModule } from './example';
import { configService } from '../config/config.service';
import { CourseModule } from './course';
import { VideoModule } from './video';
import { SubtitlesModule } from './subtitles/subtitles.module';
import { CommentsModule } from './comments/comments.module';
import { SubLinesModule } from './sub-lines/sub-lines.module';
import { CommentReactionsModule } from './comment-reactions/comment-reactions.module';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    KeycloakConnectModule.register(configService.getKeycloakConfig()),
    ExampleModule,
    CourseModule,
    VideoModule,
    SubtitlesModule,
    CommentsModule,
    SubLinesModule,
    CommentReactionsModule,
    ConfigModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
