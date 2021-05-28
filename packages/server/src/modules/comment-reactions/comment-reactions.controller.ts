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
import { CommentReactionsService } from './comment-reactions.service';
import { CommentReactionCreationDTO } from './dto/create-comment-reaction.dto';
import { CommentReactionUpdatingDTO } from './dto/update-comment-reaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommentReaction } from './entities/comment-reaction.entity';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { CommentReactionDTO } from './dto/comment-reaction.dto';

@ApiTags('Comment reactions')
@Controller('comment-reactions')
export class CommentReactionsController {
  constructor(
    private readonly commentReactionsService: CommentReactionsService,
  ) {}

  @Post()
  async create(
    @Body() commentReactionCreationDTO: CommentReactionCreationDTO,
  ): Promise<CommentReactionDTO> {
    return await this.commentReactionsService.create(
      commentReactionCreationDTO,
    );
  }

  @Get('/comment/:commentId')
  async findAll(
    @Query() paginationQuery: PaginationQueryDTO,
    @Param('commentId') commentId: string,
  ): Promise<{
    data: CommentReactionDTO[];
    totalPage: number;
    totalCount: number;
  }> {
    return await this.commentReactionsService.findAll(
      commentId,
      paginationQuery,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommentReactionDTO> {
    return await this.commentReactionsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() commentReactionUpdatingDTO: CommentReactionUpdatingDTO,
  ): Promise<CommentReactionDTO> {
    return await this.commentReactionsService.update(
      id,
      commentReactionUpdatingDTO,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.commentReactionsService.remove(id);
  }
}
