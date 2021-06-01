import { Controller, Post, UseInterceptors, Body, UploadedFile, BadRequestException } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Video } from './model';
import { VideosService } from './service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoCreationDTO } from './dto/create-video.dto';

@ApiTags('Videos')
@Crud({
  model: {
    type: Video,
  },
})
@Controller('video')
export class VideoController implements CrudController<Video> {
  constructor(public service: VideosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createVideoDto: VideoCreationDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<VideoCreationDTO> {
    if (!file) throw new BadRequestException('Video is required');
    return await this.service.create(createVideoDto, file);
  }
}
