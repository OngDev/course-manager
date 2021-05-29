import { CommentReaction } from 'src/modules/comment-reactions/entities/comment-reaction.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { catchError } from 'src/common/helpers/catch-error';
import { Repository } from 'typeorm';
import { CommentReactionCreationDTO } from '../comment-reactions/dto/create-comment-reaction.dto';
import { CommentReactionUpdatingDTO } from '../comment-reactions/dto/update-comment-reaction.dto';
import { CommentsService } from '../comments/comments.service';
import { CommentReactionDTO } from './dto/comment-reaction.dto';

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
  ): Promise<CommentReactionDTO> {
    try {
      // miss check user
      const comment = await this.commentsService.findOne(
        commentReactionCreationDTO.commentId,
      );

      if (!comment) throw new NotFoundException('Comment is not exist');

      const commentReaction = await this.commentReactionRepository.save({
        ...commentReactionCreationDTO,
        comment,
        createdBy: '',
        updatedBy: '',
      });

      return this.findOne(commentReaction.id);
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async findAll(
    commentId: string,
    paginationQuery: PaginationQueryDTO,
  ): Promise<{
    data: CommentReactionDTO[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      const { limit, offset } = paginationQuery;

      const [
        data,
        totalCount,
      ] = await this.commentReactionRepository.findAndCount({
        select: ['id', 'type', 'comment'],
        where: { comment: commentId },
        relations: ['comment'],
        loadRelationIds: true,
        skip: offset,
        take: limit,
        order: { id: 'DESC' },
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

  async findOne(id: string): Promise<CommentReactionDTO> {
    try {
      return await this.commentReactionRepository.findOne(id, {
        select: ['id', 'type', 'comment'],
        relations: ['comment'],
      });
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async update(
    id: string,
    commentReactionUpdatingDTO: CommentReactionUpdatingDTO,
  ): Promise<CommentReactionDTO> {
    try {
      await this.commentReactionRepository.save({
        id,
        ...commentReactionUpdatingDTO,
      });

      return this.findOne(id);
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
