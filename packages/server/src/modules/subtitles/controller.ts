import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SubtitlesService } from './service';
import { ApiTags } from '@nestjs/swagger';
import { Subtitle } from './model';

@ApiTags('Subtitles')
@Crud({
  model: {
    type: Subtitle,
  },
})
@Controller('subtitles')
export class SubtitlesController implements CrudController<Subtitle> {
  constructor(public service: SubtitlesService) {}
}
