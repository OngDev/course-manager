import { Injectable } from '@nestjs/common';
import { SubLineCreationDTO } from './dto/create-sub-line.dto';
import { SubLineUpdatingDTO } from './dto/update-sub-line.dto';

@Injectable()
export class SubLinesService {
  create(SubLineCreationDTO: SubLineCreationDTO) {
    return 'This action adds a new subLine';
  }

  findAll() {
    return `This action returns all subLines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subLine`;
  }

  update(id: number, SubLineUpdatingDTO: SubLineUpdatingDTO) {
    return `This action updates a #${id} subLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} subLine`;
  }
}
