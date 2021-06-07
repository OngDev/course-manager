import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CommentsService } from './service';
import { ApiTags } from '@nestjs/swagger';
import { Comment } from './model';

@ApiTags('Comments')
@Crud({
  model: {
    type: Comment,
  },
})
@Controller('comments')
export class CommentsController implements CrudController<Comment> {
  constructor(public service: CommentsService) {}
}
