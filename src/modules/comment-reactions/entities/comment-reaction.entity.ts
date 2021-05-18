import { Entity, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/modules/base/base.entity';

@Entity('comment_reaction')
export class CommentReaction extends BaseEntity {
  //   @ManyToOne(() => Subtitle, (subtitle) => subtitle, { cascade: true })
  //   subtitle: Subtitle;

  //   @ManyToOne(() => Comment, (comment) => comment, { cascade: true })
  //   comment: Comment;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  type: string;
}
