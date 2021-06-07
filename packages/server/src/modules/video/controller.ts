import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Video } from './model';
import { VideosService } from './service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Videos')
@Crud({
  model: {
    type: Video,
  },
})
@Controller('video')
export class VideoController implements CrudController<Video> {
  constructor(public service: VideosService) {}
}
