import { PartialType } from '@nestjs/swagger';
import { CommentReactionCreationDTO } from './create-comment-reaction.dto';

export class CommentReactionUpdatingDTO extends PartialType(
  CommentReactionCreationDTO,
) {}
