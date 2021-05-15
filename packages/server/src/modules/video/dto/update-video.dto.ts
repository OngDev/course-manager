import { PartialType } from '@nestjs/mapped-types';
import { VideoCreationDTO } from './create-video.dto';

export class VideoUpdationDTO extends PartialType(VideoCreationDTO) {}
