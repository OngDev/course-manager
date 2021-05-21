import { Comment } from './../comments/entities/comment.entity';
import { CommentReaction } from './entities/comment-reaction.entity';
import { Module, Logger } from '@nestjs/common';
import { CommentReactionsService } from './comment-reactions.service';
import { CommentReactionsController } from './comment-reactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from '../comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentReaction, Comment])],
  controllers: [CommentReactionsController],
  providers: [CommentReactionsService, Logger, CommentsService],
})
export class CommentReactionsModule {}
