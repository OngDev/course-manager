import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CommentReactionsService } from './service';
import { ApiTags } from '@nestjs/swagger';
import { CommentReaction } from './model';

@ApiTags('Comment reactions')
@Crud({
  model: {
    type: CommentReaction,
  },
})
@Controller('comment-reactions')
export class CommentReactionsController
  implements CrudController<CommentReaction> {
  constructor(public service: CommentReactionsService) {}
}
