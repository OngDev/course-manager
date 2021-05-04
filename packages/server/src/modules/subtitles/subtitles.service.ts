import { Injectable } from '@nestjs/common';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { UpdateSubtitleDto } from './dto/update-subtitle.dto';

@Injectable()
export class SubtitlesService {
  create(createSubtitleDto: CreateSubtitleDto) {
    return 'This action adds a new subtitle';
  }

  findAll() {
    return `This action returns all subtitles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subtitle`;
  }

  update(id: number, updateSubtitleDto: UpdateSubtitleDto) {
    return `This action updates a #${id} subtitle`;
  }

  remove(id: number) {
    return `This action removes a #${id} subtitle`;
  }
}
