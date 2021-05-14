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
import { SubtitleCreationDTO } from './dto/create-subtitle.dto';
import { SubtitleUpdatingDTO } from './dto/update-subtitle.dto';

@Controller('subtitles')
export class SubtitlesController {
  constructor(private readonly subtitlesService: SubtitlesService) {}

  @Post()
  create(@Body() subtitleCreationDTO: SubtitleCreationDTO) {
    return this.subtitlesService.create(subtitleCreationDTO);
  }

  @Get()
  findAll() {
    return this.subtitlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subtitlesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() SubtitleUpdatingDTO: SubtitleUpdatingDTO,
  ) {
    return this.subtitlesService.update(+id, SubtitleUpdatingDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtitlesService.remove(+id);
  }
}
