import { Injectable } from '@nestjs/common';
import { SubtitleCreationDTO } from './dto/create-subtitle.dto';
import { SubtitleUpdatingDTO } from './dto/update-subtitle.dto';

@Injectable()
export class SubtitlesService {
  create(subtitleCreationDTO: SubtitleCreationDTO) {
    return 'This action adds a new subtitle';
  }

  findAll() {
    return `This action returns all subtitles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subtitle`;
  }

  update(id: number, subtitleUpdatingDTO: SubtitleUpdatingDTO) {
    return `This action updates a #${id} subtitle`;
  }

  remove(id: number) {
    return `This action removes a #${id} subtitle`;
  }
}
