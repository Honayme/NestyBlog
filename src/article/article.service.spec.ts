import {Test, TestingModule} from '@nestjs/testing';
import {ArticleService} from './article.service';
import * as sinon from 'sinon';
import {Article} from './models/article.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ArticleDto} from './article.dto';

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
