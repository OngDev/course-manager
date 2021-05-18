import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentCreationDTO } from './dto/create-comment.dto';
import { CommentUpdatingDTO } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { Comment } from './entities/comment.entity';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Body() commentCreationDTO: CommentCreationDTO,
  ): Promise<Comment> {
    return await this.commentsService.create(commentCreationDTO);
  }

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDTO,
  ): Promise<{
    data: Comment[];
    totalPage: number;
    totalCount: number;
  }> {
    return await this.commentsService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    return await this.commentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() commentUpdatingDTO: CommentUpdatingDTO,
  ): Promise<Comment> {
    return await this.commentsService.update(id, commentUpdatingDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
