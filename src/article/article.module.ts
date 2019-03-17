import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Article} from './models/article.entity';
import {ArticleService} from './article.service';
import {ArticleController} from './article.controller';
import {User} from '../user/models/user.entity';
import {UserService} from '../user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([Article, User])],
    controllers: [ArticleController],
    providers: [ArticleService, UserService],
})
export class ArticleModule {}
