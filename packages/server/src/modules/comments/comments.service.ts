import { Injectable, Logger } from '@nestjs/common';
import { CommentCreationDTO } from './dto/create-comment.dto';
import { CommentUpdatingDTO } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { catchError } from 'src/common/helpers/catch-error';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly logger: Logger,
  ) {}

  async create(commentCreationDTO: CommentCreationDTO): Promise<Comment> {
    try {
      // miss check video and user
      return await this.commentRepository.save({
        ...commentCreationDTO,
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
    data: Comment[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      const { limit, offset } = paginationQuery;

      const [data, totalCount] = await this.commentRepository.findAndCount({
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

  async findOne(id: string): Promise<Comment> {
    try {
      return await this.commentRepository.findOne(id);
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async update(
    id: string,
    commentUpdatingDTO: CommentUpdatingDTO,
  ): Promise<Comment> {
    try {
      const comment = await this.commentRepository.preload({
        id,
        ...commentUpdatingDTO,
      });

      return await this.commentRepository.save(comment);
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async remove(id: string) {
    try {
      await this.commentRepository.delete(id);
      return { message: 'ok' };
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }
}
