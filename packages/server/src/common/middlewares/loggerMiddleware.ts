import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const { ip, method, originalUrl: url } = req;
      const userAgent = req.get('user-agent') || '';
      const referer = req.get('referer') || '';

      res.on('close', () => {
        const { statusCode, statusMessage } = res;
        const contentLength = res.get('content-length');
        this.logger.log(
          `[API] "${method} ${url}" ${statusCode} ${statusMessage} ${contentLength} "${referer}" "${userAgent}" "${ip}"`,
        );
      });
    } catch (error) {
      this.logger.error(error);
    }

    next();
  }
}
