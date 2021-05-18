import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentCreationDTO {
  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  videoId: string;

  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ default: '' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
