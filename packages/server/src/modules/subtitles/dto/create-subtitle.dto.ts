import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubtitleDto {
  @ApiProperty({ default: 'vn' })
  @IsString()
  @IsNotEmpty()
  language: string;
}
