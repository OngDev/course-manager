import { Entity, Column, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/modules/base/base.entity';

@Entity('sub_line')
export class SubLine extends BaseEntity {
  //   @ManyToOne(() => Subtitle, (subtitle) => subtitle, { cascade: true })
  //   subtitle: Subtitle;

  //   @ManyToOne(() => User, (supporter) => supporter, { cascade: true })
  //   supporter: User;

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  timestamp: Date;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  content: string;
}
