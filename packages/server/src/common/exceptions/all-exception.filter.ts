import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { configService } from 'src/config/config.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (
      status === HttpStatus.UNAUTHORIZED &&
      request.originalUrl === '/auth/profile'
    ) {
      response.setHeader(
        'Access-Control-Allow-Origin',
        configService.getClientUrl(),
      );

      response.setHeader(
        'Set-Cookie',
        `Authentication=; HttpOnly; Path=/; Max-Age=0;SameSite=None; Secure`,
      );
      response.status(HttpStatus.OK).send();
      return;
    }

    const message: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server';
    // message = message instanceof Object ? message?.message : message;
    if (message instanceof Array) {
      for (let i = 0; i < message.length; i++) {
        if (message[i].split(' ')[0].includes('.')) {
          const customMessage = message[i].split(' ');
          customMessage[0] = customMessage[0].split('.')[2];
          message[i] = customMessage.join(' ');
        }
      }
    }
    response.setHeader(
      'Access-Control-Allow-Origin',
      configService.getClientUrl(),
    );
    response.status(status).json({
      status,
      timestamp: new Date().toUTCString(),
      message,
      path: request.url,
    });
  }
}
