import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { isDate } from 'util';

export class CreateSubLineDto {
  @ApiProperty({ default: Date.now() })
  @IsDate()
  @IsNotEmpty()
  timestamp: Date;

  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
