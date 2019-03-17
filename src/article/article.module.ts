import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Article} from './models/article.entity';
import {ArticleService} from './article.service';
import {ArticleController} from './article.controller';
import {User} from '../user/models/user.entity';
import {UserService} from '../user/user.service';
import {AuthMiddleware} from '../shared/auth/auth.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([Article, User])],
    controllers: [ArticleController],
    providers: [ArticleService, UserService],
})
export class ArticleModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                {path: 'article', method: RequestMethod.POST},
                {path: 'article', method: RequestMethod.PUT},
            );
    }
}
