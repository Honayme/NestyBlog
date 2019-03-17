import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './models/user.entity';
import {AuthService} from '../shared/auth/auth.service';
import {JwtStrategyService} from '../shared/auth/strategies/jwt-strategy.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, AuthService],
})
export class UserModule {}
