import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {ArticleService} from './article.service';
import {Article} from './models/article.entity';
import {ArticleDto} from './article.dto';
import {CurrentUser} from '../shared/decorators/user.decorator';
import {Roles} from '../shared/decorators/roles.decorator';

@Controller('article')
@ApiBearerAuth()
export class ArticleController {
    constructor(private articleService: ArticleService,
                @InjectRepository(Article) private articleRepository: Repository<Article>) {}

    @Get()
    @ApiOperation({title: 'Get List of All Articles'})
    @ApiResponse({ status: 200, description: 'Articles Found.'})
    @ApiResponse({ status: 404, description: 'No Articles found.'})
    showAllArticles() {
        return this.articleService.showAll();
    }

    @Get(':id')
    @ApiOperation({title: 'Get a specific article with the given id'})
    @ApiResponse({ status: 200, description: 'Article Found.'})
    @ApiResponse({ status: 404, description: 'No Article found.'})
    showArticleById(@Param('id') id: number) {
        return this.articleService.showOne(id);
    }

    @Post()
    @ApiOperation({title: 'Create a new article'})
    @ApiResponse({ status: 201, description: 'New article has been created'})
    @ApiResponse({ status: 400, description: 'Article hasn\'t been created'})
    @Roles('author')
    createArticle(@CurrentUser('id') userId: number, @Body() data: ArticleDto) {
        return this.articleService.create(userId, data);
    }
