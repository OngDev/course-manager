import { Injectable } from '@nestjs/common';
import { CommentCreationDTO } from './dto/create-comment.dto';
import { CommentUpdatingDTO } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  create(commentCreationDTO: CommentCreationDTO) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, commentUpdatingDTO: CommentUpdatingDTO) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
