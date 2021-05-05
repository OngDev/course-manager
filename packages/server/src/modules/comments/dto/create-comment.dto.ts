import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
