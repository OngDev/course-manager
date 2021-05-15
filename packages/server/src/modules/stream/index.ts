import { Logger, Module } from '@nestjs/common';
import { StreamController } from './controller';
import { VideoService } from '../video/service';

@Module({
  controllers: [StreamController],
  providers: [VideoService, Logger],
})
export class StreamModule {}
