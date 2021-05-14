import { PartialType } from '@nestjs/swagger';
import { SubtitleCreationDTO } from './create-subtitle.dto';

export class SubtitleUpdatingDTO extends PartialType(SubtitleCreationDTO) {}
