import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import Video from '../video/model';

@Entity({ name: 'Courses' })
export class Course extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', length: 300 })
  thumbnailUrl: string;

  @OneToMany(() => Video, (video) => video.course)
  videos?: Video[];
}

export class CourseCreationDTO {
  @IsNotEmpty()
  @ApiProperty()
  title: string;
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @ApiProperty()
  thumbnailUrl: string;
}
