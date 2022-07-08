import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    Logger.log(
      `${req.method} : Request ... ${req.hostname}:${
        req.url
      } - ${new Date().toISOString()}`,
    );
    next();
  }
}
