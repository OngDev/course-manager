import { Module, Logger, CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { VideosService } from './service';
import { VideoController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './model';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [VideoController],
  providers: [
    VideosService,
    Logger,
    { provide: CACHE_MANAGER, useClass: CacheModule },
  ],
  exports: [VideosService],
})
export class VideoModule {}
