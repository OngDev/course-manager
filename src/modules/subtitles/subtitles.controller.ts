import { Subtitle } from 'src/modules/subtitles/entities/subtitle.entity';
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
import { SubtitlesService } from './subtitles.service';
import { SubtitleCreationDTO } from './dto/create-subtitle.dto';
import { SubtitleUpdatingDTO } from './dto/update-subtitle.dto';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Subtitles')
@Controller('subtitles')
export class SubtitlesController {
  constructor(private readonly subtitlesService: SubtitlesService) {}

  @Post()
  async create(
    @Body() subtitleCreationDTO: SubtitleCreationDTO,
  ): Promise<Subtitle> {
    return await this.subtitlesService.create(subtitleCreationDTO);
  }

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDTO,
  ): Promise<{
    data: Subtitle[];
    totalPage: number;
    totalCount: number;
  }> {
    return await this.subtitlesService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Subtitle> {
    return await this.subtitlesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() subtitleUpdatingDTO: SubtitleUpdatingDTO,
  ): Promise<Subtitle> {
    return await this.subtitlesService.update(id, subtitleUpdatingDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.subtitlesService.remove(id);
  }
}
