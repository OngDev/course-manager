import { PartialType } from '@nestjs/swagger';
import { CreateSubtitleDto } from './create-subtitle.dto';

export class UpdateSubtitleDto extends PartialType(CreateSubtitleDto) {}
