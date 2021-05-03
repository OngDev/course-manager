import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

import { AppModule } from './modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    }),
  });
  const PORT = process.env.PORT || 3333;
  const NODE_ENV = process.env.NODE_ENV || 'development';
  await app.listen(PORT, () => {
    Logger.log(`Listening on port: ${PORT}`);
    Logger.log(`Current node environment: ${NODE_ENV}`);
  });
}
bootstrap();
