import { Module, Logger } from '@nestjs/common';
import { ExampleController } from './controller';
import { ExampleService } from './service';

@Module({
  imports: [],
  controllers: [ExampleController],
  providers: [ExampleService, Logger],
})
export class ExampleModule {}
