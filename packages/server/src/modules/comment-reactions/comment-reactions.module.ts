import { Module } from '@nestjs/common';
import { CommentReactionsService } from './comment-reactions.service';
import { CommentReactionsController } from './comment-reactions.controller';

@Module({
  controllers: [CommentReactionsController],
  providers: [CommentReactionsService],
})
export class CommentReactionsModule {}
