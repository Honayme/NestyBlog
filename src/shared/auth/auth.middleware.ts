import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {UserService} from '../../user/user.service';
import {NextFunction, Request, Response} from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}
  resolve(): (req: Request, res: Response, next: NextFunction) => void {

      return async (req: Request, res: Response, next: NextFunction) => {
          if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Bearer') {
              const token = (req.headers.authorization as string).split(' ')[1];
              const decoded: any = jwt.verify(token, process.env.JWT_KEY);
              const user = await this.userService.showOne(decoded.id);

              if (!user) {
                  throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
              }

              req.user = user;
              next();

          } else {
              throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
          }
      };
  }
}
