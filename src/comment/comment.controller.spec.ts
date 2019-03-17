import {CommentController} from './comment.controller';
import {CommentService} from './comment.service';
import {Test} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {Comment} from './models/comment.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentDto} from './dto/comment.dto';

class CommentServiceMock {
    constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {
    }
}


describe('CommentController', () => {
    let commentController: CommentController;
    let commentService: CommentService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [CommentController],
            providers: [{
                provide: CommentService,
                useValue: CommentServiceMock,
            }],
        }).compile();

        // Get the commentController and commentService in the Testing Module Context
        commentService = module.get<CommentService>(CommentService);
        commentController = module.get<CommentController>(CommentController);
    });

    describe('findAll()', () => {
        it('should return an array of comments', async () => {
            const comment = [
                {
                    id: 2,
                    content: 'Great comment come with great responsability',
                    userId: 2,
                },
                {
                    id: 3,
                    content: 'Great comment come with great responsability',
                    userId: 2,
                },
            ];
            // Inject la valeur comment dans le retour du service
            commentService.showAll = jest.fn().mockResolvedValue(comment);

            const result = await commentController.showAllComments();
            // Test le retour du service à l'appel du controlleur
            expect(await commentController.showAllComments()).toBe(result);
        });
    });

    describe('showCommentById()', () => {
        it('should return a comments with the given id', async () => {
            const comment = {
                id: 2,
                content: 'Great comment come with great responsability',
                userId: 2,
            };

            // Inject la valeur comment dans le retour du service
            commentService.showOne = jest.fn().mockResolvedValue(comment);

            const result = await commentController.showCommentById(2);
            // Test le retour du service à l'appel du controlleur
            expect(await commentController.showCommentById(2)).toBe(result);
        });
    });

    describe('createComment()', () => {
        it('should return a comments who just have been created', async () => {
            const comment: CommentDto = {
                id: 2,
                content: 'Great comment come with great responsability',
                userId: null,
                articleId: null,
            };

            // Inject la valeur comment dans le retour du service
            commentService.create = jest.fn().mockResolvedValue(comment);
            const userId = 2;
            const result = await commentController.createComment(userId, comment);
            // Test le retour du service à l'appel du controlleur
            expect(await commentController.createComment(userId, comment)).toBe(result);
        });
    });

    describe('updateComment()', () => {
        it('should return a comments who just have been updated', async () => {
            const comment: CommentDto = {
                id: 2,
                content: 'Great comment come with great responsability',
                userId: 2,
                articleId: null,
            };

            const updatedData = {
                id: 2,
                content: 'Great comment come with great responsability',
                userId: 2,
                articleId: null,
            };
            // Inject la valeur comment dans le retour du service
            commentService.update = jest.fn().mockResolvedValue(comment);

            const result = await commentController.updateComment(2, updatedData);
            // Test le retour du service à l'appel du controlleur
            expect(await commentController.updateComment(2, updatedData)).toBe(result);
        });
    });

    describe('deleteComment()', () => {
        it('should return a comments who just have been deleted', async () => {
            const comment: CommentDto = {
                id: 2,
                content: 'Great comment come with great responsability',
                userId: 2,
                articleId: null,
            };


            // Inject la valeur comment dans le retour du service
            commentService.destroy = jest.fn().mockResolvedValue(comment);

            const result = await commentController.deleteComment(2);
            // Test le retour du service à l'appel du controlleur
            expect(await commentController.deleteComment(2)).toBe(result);
        });
    });

});
