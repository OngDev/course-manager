import { SubLine } from './entities/sub-line.entity';
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
import { SubLinesService } from './sub-lines.service';
import { SubLineCreationDTO } from './dto/create-sub-line.dto';
import { SubLineUpdatingDTO } from './dto/update-sub-line.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { SubLineDTO } from './dto/sub-line.dto';

@ApiTags('Sub-lines')
@Controller('sub-lines')
export class SubLinesController {
  constructor(private readonly subLinesService: SubLinesService) {}

  @Post()
  async create(
    @Body() subLineCreationDTO: SubLineCreationDTO,
  ): Promise<SubLineDTO> {
    return await this.subLinesService.create(subLineCreationDTO);
  }

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDTO,
  ): Promise<{
    data: SubLineDTO[];
    totalPage: number;
    totalCount: number;
  }> {
    return await this.subLinesService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SubLineDTO> {
    return await this.subLinesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() subLineUpdatingDTO: SubLineUpdatingDTO,
  ): Promise<SubLineDTO> {
    return await this.subLinesService.update(id, subLineUpdatingDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subLinesService.remove(id);
  }
}
