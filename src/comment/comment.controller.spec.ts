import {CommentController} from './comment.controller';
import {CommentService} from './comment.service';
import {Test} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {Comment} from './models/comment.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentDto} from './comment.dto';

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
});
