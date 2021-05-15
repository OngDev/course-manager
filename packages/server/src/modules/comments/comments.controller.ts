import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentCreationDTO } from './dto/create-comment.dto';
import { CommentUpdatingDTO } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() commentCreationDTO: CommentCreationDTO) {
    return this.commentsService.create(commentCreationDTO);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() commentUpdatingDTO: CommentUpdatingDTO,
  ) {
    return this.commentsService.update(+id, commentUpdatingDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
