import { Module, Logger } from '@nestjs/common';
import { SubLinesService } from './service';
import { SubLinesController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubLine } from './model';
import { SubtitlesService } from '../subtitles/service';
import { Subtitle } from '@modules/subtitles/model';

@Module({
  imports: [TypeOrmModule.forFeature([SubLine, Subtitle])],
  controllers: [SubLinesController],
  providers: [SubLinesService, Logger, SubtitlesService],
  exports: [SubLinesService],
})
export class SubLinesModule {}
