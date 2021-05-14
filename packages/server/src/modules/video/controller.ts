import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VideoService } from './service';
import { VideoCreationDTO } from './dto/create-video.dto';
import { VideoUpdationDTO } from './dto/update-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  create(@Body() createVideoDto: VideoCreationDTO): Promise<VideoCreationDTO> {
    return this.videoService.create(createVideoDto);
  }

  @Get()
  findAll(): Promise<VideoCreationDTO[]> {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<VideoCreationDTO> {
    return this.videoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVideoDto: VideoUpdationDTO,
  ): Promise<VideoCreationDTO> {
    return this.videoService.update(id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.videoService.remove(id);
  }
}
