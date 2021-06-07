import { SubLine } from './model';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SubLinesService } from './service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sub-lines')
@Crud({
  model: {
    type: SubLine,
  },
})
@Controller('sub-lines')
export class SubLinesController implements CrudController<SubLine> {
  constructor(public service: SubLinesService) {}
}
