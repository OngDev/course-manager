import { Module } from '@nestjs/common';
import { SubLinesService } from './sub-lines.service';
import { SubLinesController } from './sub-lines.controller';

@Module({
  controllers: [SubLinesController],
  providers: [SubLinesService],
})
export class SubLinesModule {}
