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
import { CommentReactionCreationDTO } from './dto/create-comment-reaction.dto';
import { CommentReactionUpdatingDTO } from './dto/update-comment-reaction.dto';

@Controller('comment-reactions')
export class CommentReactionsController {
  constructor(
    private readonly commentReactionsService: CommentReactionsService,
  ) {}

  @Post()
  create(@Body() CommentReactionCreationDTO: CommentReactionCreationDTO) {
    return this.commentReactionsService.create(CommentReactionCreationDTO);
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
    @Body() CommentReactionUpdatingDTO: CommentReactionUpdatingDTO,
  ) {
    return this.commentReactionsService.update(+id, CommentReactionUpdatingDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentReactionsService.remove(+id);
  }
}
