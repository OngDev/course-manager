import { Module, Logger } from '@nestjs/common';
import { SubLinesService } from './sub-lines.service';
import { SubLinesController } from './sub-lines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubLine } from './entities/sub-line.entity';
import { SubtitlesService } from '../subtitles/subtitles.service';
import { Subtitle } from '../subtitles/entities/subtitle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubLine, Subtitle])],
  controllers: [SubLinesController],
  providers: [SubLinesService, Logger, SubtitlesService],
})
export class SubLinesModule {}
