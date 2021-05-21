import { Comment } from './../comments/entities/comment.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentReaction } from '../comment-reactions/entities/comment-reaction.entity';
import { Repository } from 'typeorm';
import { CommentReactionCreationDTO } from '../comment-reactions/dto/create-comment-reaction.dto';
import { catchError } from 'src/common/helpers/catch-error';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { CommentReactionUpdatingDTO } from '../comment-reactions/dto/update-comment-reaction.dto';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class CommentReactionsService {
  constructor(
    @InjectRepository(CommentReaction)
    private readonly commentReactionRepository: Repository<CommentReaction>,
    private readonly logger: Logger,
    private readonly commentsService: CommentsService,
  ) {}

  async create(
    commentReactionCreationDTO: CommentReactionCreationDTO,
  ): Promise<CommentReaction> {
    try {
      // miss check user
      const comment = await this.commentsService.findOne(
        +commentReactionCreationDTO.commentId,
      );

      return await this.commentReactionRepository.save({
        ...commentReactionCreationDTO,
        createdBy: '',
        updatedBy: '',
      });
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async findAll(
    paginationQuery: PaginationQueryDTO,
  ): Promise<{
    data: CommentReaction[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      const { limit, offset } = paginationQuery;

      const [
        data,
        totalCount,
      ] = await this.commentReactionRepository.findAndCount({
        skip: offset,
        take: limit,
        order: { createdAt: 'DESC' },
      });

      return {
        data,
        totalPage: Math.ceil(totalCount / limit),
        totalCount,
      };
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async findOne(id: string): Promise<CommentReaction> {
    try {
      return await this.commentReactionRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async update(
    id: string,
    commentReactionUpdatingDTO: CommentReactionUpdatingDTO,
  ): Promise<CommentReaction> {
    try {
      const commentReaction = await this.commentReactionRepository.preload({
        id,
        ...commentReactionUpdatingDTO,
      });

      return await this.commentReactionRepository.save(commentReaction);
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async remove(id: string) {
    try {
      await this.commentReactionRepository.delete(id);
      return { message: 'ok' };
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }
}
