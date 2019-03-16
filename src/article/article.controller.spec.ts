import {ArticleController} from './article.controller';
import {ArticleService} from './article.service';
import {Test} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {Article} from './models/article.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {ArticleDto} from './article.dto';

class ArticleServiceMock {
    constructor(@InjectRepository(Article) private articleRepository: Repository<Article>) {
    }
}

describe('ArticleController', () => {
    let articleController: ArticleController;
    let articleService: ArticleService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ArticleController],
            providers: [{
                provide: ArticleService,
                useValue: ArticleServiceMock,
            }],
        }).compile();

        // Get the articleController and articleService in the Testing Module Context
        articleService = module.get<ArticleService>(ArticleService);
        articleController = module.get<ArticleController>(ArticleController);
    });

    describe('findAll()', () => {
        it('should return an array of articles', async () => {
            const article = [
                {
                    id: 2,
                    content: 'Great article come with great responsability',
                    userId: 2,
                },
                {
                    id: 3,
                    content: 'Great article come with great responsability',
                    userId: 2,
                },
            ];
            // Inject la valeur article dans le retour du service
            articleService.showAll = jest.fn().mockResolvedValue(article);

            const result = await articleController.showAllArticles();
            // Test le retour du service à l'appel du controlleur
            expect(await articleController.showAllArticles()).toBe(result);
        });
    });

    describe('showArticleById()', () => {
        it('should return a articles with the given id', async () => {
            const article = {
                id: 2,
                content: 'Great article come with great responsability',
                userId: 2,
            };

            // Inject la valeur article dans le retour du service
            articleService.showOne = jest.fn().mockResolvedValue(article);

            const result = await articleController.showArticleById(2);
            // Test le retour du service à l'appel du controlleur
            expect(await articleController.showArticleById(2)).toBe(result);
        });
    });
