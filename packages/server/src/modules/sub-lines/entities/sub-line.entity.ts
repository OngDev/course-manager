import { Entity, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import BaseEntity from '@modules/base/base.entity';
import { Subtitle } from 'src/modules/subtitles/entities/subtitle.entity';

@Entity('sub_line')
export class SubLine extends BaseEntity {
  @ManyToOne(() => Subtitle, (subtitle) => subtitle.subLines, { cascade: true })
  subtitle: Subtitle;

  //   @ManyToOne(() => User, (supporter) => supporter, { cascade: true })
  //   supporter: User;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  timestamp: Date;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  content: string;
}
