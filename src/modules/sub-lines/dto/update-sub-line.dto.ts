import { PartialType } from '@nestjs/swagger';
import { SubLineCreationDTO } from './create-sub-line.dto';

export class SubLineUpdatingDTO extends PartialType(SubLineCreationDTO) {}
