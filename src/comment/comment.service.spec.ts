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
    it('should call deleteComment method with expected param', async () => {
        const deleteCommentSpy = jest.spyOn(commentService, 'destroy');
        const commentId = 2;
        commentService.destroy(commentId);
        expect(deleteCommentSpy).toHaveBeenCalledWith(commentId);
    });
});
