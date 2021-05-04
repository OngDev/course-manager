import { ApiProperty } from '@nestjs/swagger';
<<<<<<< HEAD
import { IsNotEmpty, IsString } from 'class-validator';
=======
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
>>>>>>> add subtitle module

export class CreateSubtitleDto {
  @ApiProperty({ default: 'vn' })
  @IsString()
  @IsNotEmpty()
  language: string;
}
