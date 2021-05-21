import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/modules/base/base.entity';
import { Video } from '../../video/model';
import { SubLine } from 'src/modules/sub-lines/entities/sub-line.entity';

@Entity('subtitle')
export class Subtitle extends BaseEntity {
  @ManyToOne(() => Video, (video) => video.subtitles, { cascade: true })
  video: Video;

  @OneToMany(() => SubLine, (subLine) => subLine.subtitle)
  subLines: SubLine[];

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  language: string;
}
