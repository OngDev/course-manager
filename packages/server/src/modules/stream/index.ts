import { CacheModule, Logger, Module } from '@nestjs/common';
import { StreamController } from './controller';
import { VideoService } from '../video/service';

@Module({
  imports: [CacheModule.register()],
  controllers: [StreamController],
  providers: [VideoService, Logger],
})
export class StreamModule {}
