import { Video } from 'src/modules/video/entities/video.entity';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateCourseDto {
  @ApiProperty({ default: 'this is title' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ default: 'this is description' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ default: 'this is thumbnail url' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly thumbnailUrl: string;

  @IsArray()
  readonly videos?: Video[];
}
