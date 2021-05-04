import { Module } from '@nestjs/common';
import { SubtitlesService } from './subtitles.service';
import { SubtitlesController } from './subtitles.controller';

@Module({
  controllers: [SubtitlesController],
<<<<<<< HEAD
  providers: [SubtitlesService],
=======
  providers: [SubtitlesService]
>>>>>>> add subtitle module
})
export class SubtitlesModule {}
