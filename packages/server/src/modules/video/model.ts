import { Course } from '@modules/course/model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import BaseEntity from '../base/base.entity';
import { Subtitle } from '@modules/subtitles/model';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'Videos' })
export class Video extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  @ApiProperty()
  title: string;

  @Column({ type: 'varchar', length: 300 })
  @ApiProperty()
  description: string;

  @Column({ type: 'varchar', length: 300 })
  @ApiProperty()
  thumbnailUrl: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @ApiProperty()
  videoUrl: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  publishAt: Date;

  @Column({ type: 'smallint' })
  @ApiProperty()
  order: number;

  @ManyToOne(() => Course, (course) => course.videos)
  course: Course;

  @OneToMany(() => Subtitle, (subtitle) => subtitle.video)
  subtitles: Subtitle[];
}
