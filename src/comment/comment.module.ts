import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommentController} from './comment.controller';
import {CommentService} from './comment.service';
import {Comment} from './models/comment.entity';
import {AuthMiddleware} from '../shared/auth/auth.middleware';
import {User} from '../user/models/user.entity';
import {UserService} from '../user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([Comment, User])],
    controllers: [CommentController],
    providers: [CommentService, UserService],
})
export class CommentModule  implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                {path: 'comment', method: RequestMethod.POST},
            );
    }
}
