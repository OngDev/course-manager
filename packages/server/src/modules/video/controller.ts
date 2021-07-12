import { User } from '@modules/user/model';
import { Controller, Post, Body, Req, Logger, Get, Param } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { Video } from './model';
import { VideosService } from './service';
import { ApiTags } from '@nestjs/swagger';
import { VideoCreationDTO } from './dto/create-video.dto';
import { Course } from '@modules/course/model';
import { VideoDTO } from './dto/video';

@ApiTags('Videos')
@Crud({
  model: {
    type: Video,
  },
})
@Controller('videos')
export class VideoController implements CrudController<Video> {
  constructor(public service: VideosService, private readonly logger: Logger) {}

  get base(): CrudController<Video> {
    return this;
  }

  // Create video of course
  @Post()
  async create(
    @Body() createVideoDto: VideoCreationDTO,
  ): Promise<VideoCreationDTO> {
    try {
      return await this.service.create(createVideoDto);
    } catch (error) {
      this.logger.error(error);
    }
  }

  // Find video by Id
  @Get('course/:courseId')
  async findByCourseId(@Param('courseId') courseId: string): Promise<VideoDTO[]> {
    try {
      return await this.service.findByCourseId(courseId);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
