import {Test, TestingModule} from '@nestjs/testing';
import {CommentService} from './comment.service';
import * as sinon from 'sinon';
import {Comment} from './models/comment.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CommentDto} from './comment.dto';

describe('CommentService', () => {
    let commentService: CommentService;
    let sandbox: sinon.SinonSandbox;

    beforeAll(async () => {
        sandbox = sinon.createSandbox();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommentService,
                {
                    provide: getRepositoryToken(Comment),
                    useValue: sinon.createStubInstance(Repository),
                },
            ],
        }).compile();

        commentService = module.get<CommentService>(CommentService);
    });
    it('should be defined', () => {
        expect(commentService).toBeDefined();
    });

    it('should call showAll method with expected param', async () => {
        const findAllNotesSpy = jest.spyOn(commentService, 'showAll');
        commentService.showAll();
        expect(findAllNotesSpy).toHaveBeenCalledWith();
    });

    it('should call showOne method with expected param', async () => {
        const findOneCommentSpy = jest.spyOn(commentService, 'showOne');
        const showOneOptions = 2;
        commentService.showOne(showOneOptions);
        expect(findOneCommentSpy).toHaveBeenCalledWith(showOneOptions);
    });

    it('should call saveComment method with expected params', async () => {
        const createCommentSpy = jest.spyOn(commentService, 'create');
        const dto = new CommentDto();
        const userId = 2;
        commentService.create(userId, dto);
        expect(createCommentSpy).toHaveBeenCalledWith(dto);
    });

    it('should call updateComment method with expected params', async () => {
        const updateCommentSpy = jest.spyOn(commentService, 'update');
        const commentId = 2;
        const dto = new CommentDto();
        commentService.update(commentId, dto);
        expect(updateCommentSpy).toHaveBeenCalledWith(commentId, dto);
    });

    it('should call deleteComment method with expected param', async () => {
        const deleteCommentSpy = jest.spyOn(commentService, 'destroy');
        const commentId = 2;
        commentService.destroy(commentId);
        expect(deleteCommentSpy).toHaveBeenCalledWith(commentId);
    });
});
