import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import BaseEntity from '@modules/base/base.entity';
import { Video } from '@modules/video/model';
import { SubLine } from '@modules/sub-lines/model';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Subtitles')
export class Subtitle extends BaseEntity {
  @ManyToOne(() => Video, (video) => video.subtitles, { cascade: true })
  video: Video;

  @OneToMany(() => SubLine, (subLine) => subLine.subtitle)
  subLines: SubLine[];

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  language: string;
}
