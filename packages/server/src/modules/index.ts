import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ExampleModule } from './example/example.module';

@Module({
  imports: [ExampleModule, ConfigModule.forRoot()],
})
export class AppModule {}
