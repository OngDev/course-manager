import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubLinesService } from './sub-lines.service';
import { CreateSubLineDto } from './dto/create-sub-line.dto';
import { UpdateSubLineDto } from './dto/update-sub-line.dto';

@Controller('sub-lines')
export class SubLinesController {
  constructor(private readonly subLinesService: SubLinesService) {}

  @Post()
  create(@Body() createSubLineDto: CreateSubLineDto) {
    return this.subLinesService.create(createSubLineDto);
  }

  @Get()
  findAll() {
    return this.subLinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subLinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubLineDto: UpdateSubLineDto) {
    return this.subLinesService.update(+id, updateSubLineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subLinesService.remove(+id);
  }
}
