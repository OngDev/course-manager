import { Injectable } from '@nestjs/common';
import { CreateCommentReactionDto } from './dto/create-comment-reaction.dto';
import { UpdateCommentReactionDto } from './dto/update-comment-reaction.dto';

@Injectable()
export class CommentReactionsService {
  create(createCommentReactionDto: CreateCommentReactionDto) {
    return 'This action adds a new commentReaction';
  }

  findAll() {
    return `This action returns all commentReactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentReaction`;
  }

  update(id: number, updateCommentReactionDto: UpdateCommentReactionDto) {
    return `This action updates a #${id} commentReaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentReaction`;
  }
}
