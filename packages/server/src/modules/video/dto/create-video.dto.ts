import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Course } from 'src/modules/course/model';
export class CreateVideoDto {
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

  @ApiProperty({ default: 'this is thumbnailUrl' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly thumbnailUrl?: string;

  @ApiProperty({ default: 'this is videoUrl' })
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  readonly videoUrl?: string;

  @ApiProperty({
    default: new Course(),
  })
  @IsNotEmpty()
  readonly course?: Course;
}
