import { CacheModule, Logger, Module } from '@nestjs/common';
import { StreamController } from './controller';
import { VideosService } from '../video/service';

@Module({
  imports: [CacheModule.register()],
  controllers: [StreamController],
  providers: [VideosService, Logger],
})
export class StreamModule {}
