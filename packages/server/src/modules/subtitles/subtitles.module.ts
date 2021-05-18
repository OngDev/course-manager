import { Video } from 'src/modules/video/model';
import { Module, Logger } from '@nestjs/common';
import { SubtitlesService } from './subtitles.service';
import { SubtitlesController } from './subtitles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtitle } from './entities/subtitle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subtitle, Video])],
  controllers: [SubtitlesController],
  providers: [SubtitlesService, Logger],
  exports: [SubtitlesService],
})
export class SubtitlesModule {}
