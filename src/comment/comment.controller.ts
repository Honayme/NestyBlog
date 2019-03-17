import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentService} from './comment.service';
import {Comment} from './models/comment.entity';
import {CommentDto} from './comment.dto';
import {CurrentUser} from '../shared/decorators/user.decorator';
import {Roles} from '../shared/decorators/roles.decorator';
import {User} from '../user/models/user.entity';

@Controller('comment')
@ApiBearerAuth()
export class CommentController {
    constructor(private commentService: CommentService,
                @InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

    @Delete(':id')
    @ApiOperation({title: 'Delete a comment'})
    @ApiResponse({ status: 200, description: 'Comment has been deleted'})
    @ApiResponse({ status: 400, description: 'The comment hasn\'t been found'})
    @ApiResponse({ status: 404, description: 'No Comment found.'})
    deleteComment(@CurrentUser('id') userId: number, @Param('id') id: number) {
        if (userId) {
            //Get the user
            const currentUser = User.find({ where: { id: userId }, relations: ['article'] });
            currentUser.comment.forEach(function(e) {
                if (id === e.id) {
                    return this.commentService.destroy(id);
                } else {
                    throw new HttpException('You can\'t update articles that not belongs to you', HttpStatus.UNAUTHORIZED);
                }
            });
        }
        throw new HttpException('You have to be logged in the app', HttpStatus.UNAUTHORIZED);
    }
}
