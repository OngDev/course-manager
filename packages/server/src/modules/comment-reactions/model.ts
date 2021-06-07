import { Comment } from '@modules/comments/model';
import { Entity, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import BaseEntity from '@modules/base/base.entity';

@Entity('comment_reaction')
export class CommentReaction extends BaseEntity {
  @ManyToOne(() => Comment, (comment) => comment.commentReactions, {
    cascade: true,
  })
  comment: Comment;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  type: string;
}
