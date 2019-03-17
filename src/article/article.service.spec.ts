import {Test, TestingModule} from '@nestjs/testing';
import {ArticleService} from './article.service';
import * as sinon from 'sinon';
import {Article} from './models/article.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ArticleDto} from './dto/article.dto';

describe('ArticleService', () => {
    let articleService: ArticleService;
    let sandbox: sinon.SinonSandbox;

    beforeAll(async () => {
        sandbox = sinon.createSandbox();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArticleService,
                {
                    provide: getRepositoryToken(Article),
                    useValue: sinon.createStubInstance(Repository),
                },
            ],
        }).compile();

        articleService = module.get<ArticleService>(ArticleService);
    });
    it('should be defined', () => {
        expect(articleService).toBeDefined();
    });

    it('should call showAll method with expected param', async () => {
        const findAllNotesSpy = jest.spyOn(articleService, 'showAll');
        articleService.showAll();
        expect(findAllNotesSpy).toHaveBeenCalledWith();
    });

    it('should call showOne method with expected param', async () => {
        const findOneArticleSpy = jest.spyOn(articleService, 'showOne');
        const showOneOptions = 2;
        articleService.showOne(showOneOptions);
        expect(findOneArticleSpy).toHaveBeenCalledWith(showOneOptions);
    });

    it('should call saveArticle method with expected params', async () => {
        const createArticleSpy = jest.spyOn(articleService, 'create');
        const dto = new ArticleDto();
        const userId = 2;
        articleService.create(userId, dto);
        expect(createArticleSpy).toHaveBeenCalledWith(dto);
    });

    it('should call updateArticle method with expected params', async () => {
        const updateArticleSpy = jest.spyOn(articleService, 'update');
        const articleId = 2;
        const dto = new ArticleDto();
        articleService.update(articleId, dto);
        expect(updateArticleSpy).toHaveBeenCalledWith(articleId, dto);
    });

    it('should call deleteArticle method with expected param', async () => {
        const deleteArticleSpy = jest.spyOn(articleService, 'destroy');
        const articleId = 2;
        articleService.destroy(articleId);
        expect(deleteArticleSpy).toHaveBeenCalledWith(articleId);
    });
});
