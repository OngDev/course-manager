import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ExampleModule } from './example';

@Module({
  imports: [ExampleModule, ConfigModule.forRoot()],
})
export class AppModule {}
