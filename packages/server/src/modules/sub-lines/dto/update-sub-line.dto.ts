import { PartialType } from '@nestjs/swagger';
import { CreateSubLineDto } from './create-sub-line.dto';

export class UpdateSubLineDto extends PartialType(CreateSubLineDto) {}
