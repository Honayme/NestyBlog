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
