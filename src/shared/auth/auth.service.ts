import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {sign, SignOptions} from 'jsonwebtoken';
import {UserService} from '../../user/user.service';
import {JwtPayload} from './jwt-payload';
import {User} from '../../user/models/user.entity';

@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;

    constructor(
        @Inject(forwardRef(() => UserService))
        readonly userService: UserService,
    ) {
        this.jwtOptions = { expiresIn: '12h' };
        this.jwtKey = process.env.JWT_KEY;
    }

    async signPayload(payload: JwtPayload): Promise<string> {
        return sign(payload, this.jwtKey, this.jwtOptions);
    }

    async validateUser(payload: JwtPayload): Promise<User> {
        return this.userService.showOne(payload.id);
    }
}
