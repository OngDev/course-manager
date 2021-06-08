import { User } from '@modules/user/model';
import { Controller, Post, Body, Req } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Video } from './model';
import { VideosService } from './service';
import { ApiTags } from '@nestjs/swagger';
import { VideoCreationDTO } from './dto/create-video.dto';

@ApiTags('Videos')
@Crud({
  model: {
    type: Video,
  },
  routes: {
    only: [
      'createOneBase',
      'deleteOneBase',
      'getOneBase',
      'updateOneBase',
      'getManyBase',
    ],
  },
})
@Controller('video')
export class VideoController implements CrudController<Video> {
  constructor(public service: VideosService) {}

  @Post()
  async create(
    @Body() createVideoDto: VideoCreationDTO,
  ): Promise<VideoCreationDTO> {
    return await this.service.create(createVideoDto);
  }
}
