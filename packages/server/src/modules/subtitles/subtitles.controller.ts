<<<<<<< HEAD
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubtitlesService } from './subtitles.service';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { UpdateSubtitleDto } from './dto/update-subtitle.dto';

=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubtitlesService } from './subtitles.service';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { UpdateSubtitleDto } from './dto/update-subtitle.dto';
import { SubtitleSwagger, CreateSubtitleSwagger, UpdateSubtitleSwagger } from './subtitles.decorator';

@SubtitleSwagger()
>>>>>>> add subtitle module
@Controller('subtitles')
export class SubtitlesController {
  constructor(private readonly subtitlesService: SubtitlesService) {}

<<<<<<< HEAD
=======
  @CreateSubtitleSwagger()
>>>>>>> add subtitle module
  @Post()
  create(@Body() createSubtitleDto: CreateSubtitleDto) {
    return this.subtitlesService.create(createSubtitleDto);
  }

  @Get()
  findAll() {
    return this.subtitlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subtitlesService.findOne(+id);
  }

<<<<<<< HEAD
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubtitleDto: UpdateSubtitleDto,
  ) {
=======
  @UpdateSubtitleSwagger()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubtitleDto: UpdateSubtitleDto) {
>>>>>>> add subtitle module
    return this.subtitlesService.update(+id, updateSubtitleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtitlesService.remove(+id);
  }
}
