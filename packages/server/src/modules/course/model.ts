import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Video } from '../video/model';

@Entity({ name: 'course' })
export class Course extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', length: 300 })
  thumbnailUrl: string;

  @OneToMany((type) => Video, (video) => video.course)
  videos: Video[];
}
