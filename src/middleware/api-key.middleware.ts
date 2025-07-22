import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-docs-key'];
    const validKey =  'lakalakalaka'; // set default or use env

    if (apiKey !== validKey) {
      throw new HttpException('Unauthorized - Invalid API Key', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
