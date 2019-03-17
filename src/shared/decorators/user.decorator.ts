import {createParamDecorator, HttpException, HttpStatus} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {UserService} from '../../user/user.service';

export const CurrentUser = createParamDecorator(async (data, req) => {
    // if route is protected, there is a user set in auth.middleware
    if (!!req.user) {
        return !!data ? req.user[data] : req.user;
    };

    // in case a route is not protected, we still want to get the optional auth user from jwt
    const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null;
    if (token && token[1]) {
        const decoded: any = jwt.verify(token[1], process.env.JWT_KEY);
        return !!data ? decoded[data] : decoded.user;
    }
});
