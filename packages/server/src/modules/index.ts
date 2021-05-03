import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExampleModule } from './example';
import { configService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ExampleModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
