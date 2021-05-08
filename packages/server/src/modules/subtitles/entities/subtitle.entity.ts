import { Entity, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/modules/base/base.entity';
import { Video } from 'src/modules/video/entities/video.entity';

@Entity('subtitle')
export class Subtitle extends BaseEntity {
  @ManyToOne(() => Video, (video) => video.subtitles, { cascade: true })
  video: Video;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  language: string;
}
