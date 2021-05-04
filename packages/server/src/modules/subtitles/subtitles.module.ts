import { Module } from '@nestjs/common';
import { SubtitlesService } from './subtitles.service';
import { SubtitlesController } from './subtitles.controller';

@Module({
  controllers: [SubtitlesController],
  providers: [SubtitlesService]
})
export class SubtitlesModule {}
