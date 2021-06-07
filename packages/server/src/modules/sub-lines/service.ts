import { Injectable } from '@nestjs/common';
import { SubLine } from './model';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubLinesService extends TypeOrmCrudService<SubLine> {
  constructor(
    @InjectRepository(SubLine)
    subLineRepository: Repository<SubLine>,
  ) {
    super(subLineRepository);
  }
}
