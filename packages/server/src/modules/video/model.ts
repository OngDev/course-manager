import { Course } from 'src/modules/course/model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Subtitle } from 'src/modules/subtitles/entities/subtitle.entity';
@Entity({ name: 'video' })
export class Video extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', length: 300 })
  thumbnailUrl: string;

  @Column({ type: 'varchar', length: 300 })
  videoUrl: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  publishAt: Date;

  @ManyToOne(() => Course, (course) => course.videos)
  course: Course;

  @OneToMany(() => Subtitle, (subtitle) => subtitle.video)
  subtitles: Subtitle[];
}
