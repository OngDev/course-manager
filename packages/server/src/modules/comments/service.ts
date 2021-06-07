import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
// import { catchError } from 'src/common/helpers/catch-error';
// import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { Comment } from './model';

@Injectable()
export class CommentsService extends TypeOrmCrudService<Comment> {
  constructor(
    @InjectRepository(Comment)
    commentRepository: Repository<Comment>,
  ) {
    super(commentRepository);
  }

  // async findWithPagination(
  //   paginationQuery: PaginationQueryDTO,
  // ): Promise<{
  //   data: CommentDTO[];
  //   totalPage: number;
  //   totalCount: number;
  // }> {
  //   try {
  //     const { limit, offset } = paginationQuery;

  //     const [data, totalCount] = await this.commentRepository.findAndCount({
  //       select: ['id', 'content'],
  //       skip: offset,
  //       take: limit,
  //       order: { createdAt: 'DESC' },
  //     });

  //     return {
  //       data,
  //       totalPage: Math.ceil(totalCount / limit),
  //       totalCount,
  //     };
  //   } catch (error) {
  //     this.logger.error(error);
  //     catchError(error);
  //   }
  // }
}
