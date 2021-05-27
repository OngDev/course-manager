import { IsString, IsDate } from 'class-validator';
import { Subtitle } from 'src/modules/subtitles/entities/subtitle.entity';
export class SubLineDTO {
  @IsString()
  id: string;

  subtitle: Subtitle;

  // @ApiProperty({ default: '' })
  // @IsString()
  // @IsNotEmpty()
  // supporterId: string;

  @IsDate()
  timestamp: Date;

  @IsString()
  content: string;
}
