import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class SubLineCreationDTO {
  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  subtitleId: string;

  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  supporterId: string;

  @ApiProperty({ default: new Date(Date.now()).toISOString() })
  @IsDate()
  @IsNotEmpty()
  timestamp: Date;

  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
