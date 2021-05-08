import { Injectable } from '@nestjs/common';
import { CreateSubLineDto } from './dto/create-sub-line.dto';
import { UpdateSubLineDto } from './dto/update-sub-line.dto';

@Injectable()
export class SubLinesService {
  create(createSubLineDto: CreateSubLineDto) {
    return 'This action adds a new subLine';
  }

  findAll() {
    return `This action returns all subLines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subLine`;
  }

  update(id: number, updateSubLineDto: UpdateSubLineDto) {
    return `This action updates a #${id} subLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} subLine`;
  }
}
