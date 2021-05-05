import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentReactionsService } from './comment-reactions.service';
import { CreateCommentReactionDto } from './dto/create-comment-reaction.dto';
import { UpdateCommentReactionDto } from './dto/update-comment-reaction.dto';

@Controller('comment-reactions')
export class CommentReactionsController {
  constructor(
    private readonly commentReactionsService: CommentReactionsService,
  ) {}

  @Post()
  create(@Body() createCommentReactionDto: CreateCommentReactionDto) {
    return this.commentReactionsService.create(createCommentReactionDto);
  }

  @Get()
  findAll() {
    return this.commentReactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentReactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentReactionDto: UpdateCommentReactionDto,
  ) {
    return this.commentReactionsService.update(+id, updateCommentReactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentReactionsService.remove(+id);
  }
}
