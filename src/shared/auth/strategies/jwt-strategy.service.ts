import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy, VerifiedCallback} from 'passport-jwt';
import {AuthService} from '../auth.service';
import {JwtPayload} from '../jwt-payload';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_KEY,
        });
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        }

        return done(null, user, payload.iat);
    }
}
