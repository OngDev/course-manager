import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class SubLineCreationDTO {
  @ApiProperty({ default: Date.now() })
  @IsDate()
  @IsNotEmpty()
  timestamp: Date;

  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
