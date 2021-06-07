import { Video } from 'src/modules/video/model';
import { Module, Logger } from '@nestjs/common';
import { SubtitlesService } from './service';
import { SubtitlesController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtitle } from './model';

@Module({
  imports: [TypeOrmModule.forFeature([Subtitle, Video])],
  controllers: [SubtitlesController],
  providers: [SubtitlesService, Logger],
  exports: [SubtitlesService],
})
export class SubtitlesModule {}
