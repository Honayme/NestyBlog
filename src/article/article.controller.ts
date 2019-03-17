import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {ArticleService} from './article.service';
import {Article} from './models/article.entity';
import {ArticleDto} from './article.dto';
import {CurrentUser} from '../shared/decorators/user.decorator';
import {Roles} from '../shared/decorators/roles.decorator';
import {User} from '../user/models/user.entity';
import {AuthGuard} from '@nestjs/passport';

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

    @Get()
    @ApiOperation({title: 'Get List of All Articles'})
    @ApiResponse({ status: 200, description: 'Articles Found.'})
    @ApiResponse({ status: 404, description: 'No Articles found.'})
    @ApiResponse({ status: 403, description: 'Forbidden'})
    @Roles('author')
    showAllAuthorArticles(@CurrentUser('id') userId: number) {
        if (userId) {
            return this.articleService.showAllAuthorArticles(userId);
        }
        throw new HttpException('You have to be logged on the app', HttpStatus.UNAUTHORIZED);
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
    @ApiResponse({ status: 403, description: 'Forbidden'})
    @Roles('author')
    createArticle(@CurrentUser('id') userId: number, @Body() data: ArticleDto) {
        if (userId) {
            return this.articleService.create(userId, data);
        } else {
            throw new HttpException('You can\'t create an article if you\'r not connected', HttpStatus.UNAUTHORIZED);
        }
    }

    @Put(':id')
    @ApiOperation({title: 'Update an article'})
    @ApiResponse({ status: 201, description: 'Article has been updated'})
    @ApiResponse({ status: 400, description: 'Article hasn\'t been updated'})
    @ApiResponse({ status: 404, description: 'No Article found.'})
    @ApiResponse({ status: 403, description: 'Forbidden'})
    @Roles('author')
    async updateArticle(@CurrentUser('id') userId: number, @Param('id') id: number, @Body() data: Partial<ArticleDto>) {
        if (userId) {
            //Get the user
            const currentUser = await User.find({ where: { id: userId }, relations: ['article'] });
            currentUser.forEach(function(e) {
                if (e.article ===  this.article) {
                    return this.articleService.update(id, data);
                } else {
                    throw new HttpException('You can\'t update articles that not belongs to you', HttpStatus.UNAUTHORIZED);
                }
            });
        }
    }

    @Delete(':id')
    @ApiOperation({title: 'Delete an article'})
    @ApiResponse({ status: 200, description: 'Article has been deleted'})
    @ApiResponse({ status: 400, description: 'The article hasn\'t been found'})
    @ApiResponse({ status: 404, description: 'No Article found.'})
    async deleteArticle(@CurrentUser('id') userId: number, @Param('id') id: number) {
        if (userId) {
            //Get the user
            const currentUser = await User.find({ where: { id: userId }, relations: ['article'] });
            const currentArticle = await Article.find({ where: { id }});
            currentUser.forEach(function(e) {
                if (e.article) {
                    if (e.article ===  currentArticle) {
                        return this.articleService.destroy(id);
                    } else {
                        throw new HttpException('You can\'t update articles that not belongs to you', HttpStatus.UNAUTHORIZED);
                    }
                } else {
                    throw new HttpException('You don\'t have articles that belongs to you', HttpStatus.UNAUTHORIZED);
                }
            });
        } else {
            throw new HttpException('You can\'t delete articles that not belongs to you', HttpStatus.UNAUTHORIZED);
        }
    }
}
