import { Comment } from './../../comments/entities/comment.entity';
import { IsEnum, IsString } from 'class-validator';
import { ReactionType } from 'src/common/enums/reaction-type.enum';

export class CommentReactionDTO {
  @IsString()
  id: string;

  comment: Comment;

  @IsEnum(ReactionType)
  type: string;
}
