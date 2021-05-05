import { Entity, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/modules/base/base.entity';

@Entity('subtitle')
export class Subtitle extends BaseEntity {
  //   @ManyToOne(() => Video, (video) => video, { cascade: true })
  //   video: Video;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  language: string;
}
