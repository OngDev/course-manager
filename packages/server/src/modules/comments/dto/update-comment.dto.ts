import { PartialType } from '@nestjs/swagger';
import { CommentCreationDTO } from './create-comment.dto';

export class CommentUpdatingDTO extends PartialType(CommentCreationDTO) {}
