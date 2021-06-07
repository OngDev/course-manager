import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subtitle } from './model';

@Injectable()
export class SubtitlesService extends TypeOrmCrudService<Subtitle> {
  constructor(
    @InjectRepository(Subtitle)
    subtitleRepository: Repository<Subtitle>,
  ) {
    super(subtitleRepository);
  }
}
