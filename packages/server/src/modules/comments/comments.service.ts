import { Injectable, Logger } from '@nestjs/common';
import { CommentCreationDTO } from './dto/create-comment.dto';
import { CommentUpdatingDTO } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { catchError } from 'src/common/helpers/catch-error';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { CommentDTO } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly logger: Logger,
  ) {}

  async create(commentCreationDTO: CommentCreationDTO): Promise<CommentDTO> {
    try {
      // miss check video and user
      const comment = await this.commentRepository.save({
        ...commentCreationDTO,
        createdBy: '',
        updatedBy: '',
      });

      return await this.findOne(comment.id);
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async findAll(
    paginationQuery: PaginationQueryDTO,
  ): Promise<{
    data: CommentDTO[];
    totalPage: number;
    totalCount: number;
  }> {
    try {
      const { limit, offset } = paginationQuery;

      const [data, totalCount] = await this.commentRepository.findAndCount({
        select: ['id', 'content'],
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

  async findOne(id: string): Promise<CommentDTO> {
    try {
      return await this.commentRepository.findOne(id, {
        select: ['id', 'content'],
      });
    } catch (error) {
      this.logger.error(error);
      catchError(error);
    }
  }

  async update(
    id: string,
    commentUpdatingDTO: CommentUpdatingDTO,
  ): Promise<CommentDTO> {
    try {
      const comment = await this.commentRepository.preload({
        id,
        ...commentUpdatingDTO,
      });

      await this.commentRepository.save(comment);

      return await this.findOne(comment.id);
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
