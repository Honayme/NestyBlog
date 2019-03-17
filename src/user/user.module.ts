import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './models/user.entity';
import {AuthMiddleware} from '../shared/auth/auth.middleware';
import {AuthService} from '../shared/auth/auth.service';
import {JwtStrategyService} from '../shared/auth/strategies/jwt-strategy.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                {path: 'user', method: RequestMethod.POST},
                {path: 'user', method: RequestMethod.PUT},
            );
    }
}
