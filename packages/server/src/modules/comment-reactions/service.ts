import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CommentReaction } from './model';

@Injectable()
export class CommentReactionsService extends TypeOrmCrudService<CommentReaction> {
  constructor(
    @InjectRepository(CommentReaction)
    commentReactionRepository: Repository<CommentReaction>,
  ) {
    super(commentReactionRepository);
  }
}
