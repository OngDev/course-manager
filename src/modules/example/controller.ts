import { Controller, Get, Logger } from '@nestjs/common';
import { ExampleService } from './service';

@Controller()
export class ExampleController {
  constructor(
    private readonly logger: Logger,
    private readonly exampleService: ExampleService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('Im here');
    return this.exampleService.getHello();
  }
}
