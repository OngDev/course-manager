import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubtitleDto {
  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  videoId: string;

  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  supporterId: string;

  @ApiProperty({ default: 'vn' })
  @IsString()
  @IsNotEmpty()
  language: string;
}
