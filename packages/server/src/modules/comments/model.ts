import { Entity, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import BaseEntity from '@modules/base/base.entity';
import { CommentReaction } from '@modules/comment-reactions/model';
import { ApiProperty } from '@nestjs/swagger';
@Entity('comment')
export class Comment extends BaseEntity {
  @OneToMany(
    () => CommentReaction,
    (commentReaction) => commentReaction.comment,
  )
  @ApiProperty({ type: [CommentReaction] })
  commentReactions: CommentReaction[];

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
