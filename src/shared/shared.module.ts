import {Global, Module} from '@nestjs/common';
import {AuthService} from './auth/auth.service';
import {JwtStrategyService} from './auth/strategies/jwt-strategy.service';
import {UserModule} from '../user/user.module';
import {UserService} from '../user/user.service';

@Global()
@Module({
    providers: [AuthService, JwtStrategyService, UserService],
    exports: [AuthService],
    imports: [UserModule],
})
export class SharedModule {}
