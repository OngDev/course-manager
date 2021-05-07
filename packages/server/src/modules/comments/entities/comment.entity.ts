import { Entity, Column, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/modules/base/base.entity';

@Entity('comment')
export class Comment extends BaseEntity {
  //  @ManyToOne(() => Video, (video) => video, { cascade: true })
  //  video: Video;

  //  @ManyToOne(() => User, (user) => user, { cascade: true })
  //  user: User;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  content: string;
}
