import { User } from '@modules/user/model';
import { Controller, Post, Body, Req, Logger } from '@nestjs/common';
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

  @Post()
  async create(
    @Body() createVideoDto: VideoCreationDTO,
  ): Promise<VideoCreationDTO> {
    return await this.service.create(createVideoDto);
  }
}
