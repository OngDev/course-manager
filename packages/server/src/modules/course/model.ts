import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from '../base/base.entity';
import { Video } from '../video/model';

@Entity({ name: 'course' })
export class Course extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  @ApiProperty()
  title: string;

  @Column({ type: 'varchar', length: 300 })
  @ApiProperty()
  description: string;

  @Column({ type: 'varchar', length: 300 })
  @ApiProperty()
  thumbnailUrl: string;

  @OneToMany(() => Video, (video) => video.course)
  videos?: Video[];
}
