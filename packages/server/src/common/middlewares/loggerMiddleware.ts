import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const { ip, method, originalUrl: url } = req;
      const userAgent = req.get('user-agent') || '';

      res.on('close', () => {
        const { statusCode, statusMessage } = res;
        this.logger.log(
          `[API] "${method} ${url}" ${statusCode} ${statusMessage} "${userAgent}" "${ip}"`,
        );
      });
    } catch (error) {
      this.logger.error(error);
    }

    next();
  }
}
