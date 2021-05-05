import { PartialType } from '@nestjs/swagger';
import { CreateCommentReactionDto } from './create-comment-reaction.dto';

export class UpdateCommentReactionDto extends PartialType(
  CreateCommentReactionDto,
) {}
