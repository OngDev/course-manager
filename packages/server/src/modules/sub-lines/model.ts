import { Entity, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import BaseEntity from '@modules/base/base.entity';
import { Subtitle } from '@modules/subtitles/model';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sub_line')
export class SubLine extends BaseEntity {
  @ManyToOne(() => Subtitle, (subtitle) => subtitle.subLines, { cascade: true })
  subtitle: Subtitle;

  //   @ManyToOne(() => User, (supporter) => supporter, { cascade: true })
  //   supporter: User;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @ApiProperty()
  timestamp: Date;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
