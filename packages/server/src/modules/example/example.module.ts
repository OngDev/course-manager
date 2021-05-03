import { Module, Logger } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

@Module({
  imports: [],
  controllers: [ExampleController],
  providers: [ExampleService, Logger],
})
export class ExampleModule {}
