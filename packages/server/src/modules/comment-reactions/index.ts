import { Module, Logger } from '@nestjs/common';
import { CommentReactionsService } from './service';
import { CommentReactionsController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from '../comments/service';
import { Comment } from '@modules/comments/model';
import { CommentReaction } from './model';

@Module({
  imports: [TypeOrmModule.forFeature([CommentReaction, Comment])],
  controllers: [CommentReactionsController],
  providers: [CommentReactionsService, Logger, CommentsService],
})
export class CommentReactionsModule {}
