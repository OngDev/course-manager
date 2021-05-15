import { Injectable } from '@nestjs/common';
import { CommentReactionCreationDTO } from './dto/create-comment-reaction.dto';
import { CommentReactionUpdatingDTO } from './dto/update-comment-reaction.dto';

@Injectable()
export class CommentReactionsService {
  create(commentReactionCreationDTO: CommentReactionCreationDTO) {
    return 'This action adds a new commentReaction';
  }

  findAll() {
    return `This action returns all commentReactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentReaction`;
  }

  update(id: number, commentReactionUpdatingDTO: CommentReactionUpdatingDTO) {
    return `This action updates a #${id} commentReaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentReaction`;
  }
}
