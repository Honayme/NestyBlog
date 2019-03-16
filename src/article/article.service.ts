import {Injectable, Param} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {ArticleDto} from './article.dto';
import {Article} from './models/article.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>) {}

    async showAll() {
        return await this.articleRepository.find();
    }

    async create(userId: number, data: ArticleDto) {
        data.userId = userId;
        const article = await this.articleRepository.create(data);

        await this.articleRepository.save(article);
        return article;
    }

    async showOne(@Param('id') id: number) {
        return await this.articleRepository.findOne({where: {id}});
    }
