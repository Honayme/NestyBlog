import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentService} from './comment.service';
import {Comment} from './models/comment.entity';
import {CommentDto} from './dto/comment.dto';
import {CurrentUser} from '../shared/decorators/user.decorator';
import {Roles} from '../shared/decorators/roles.decorator';
import {User} from '../user/models/user.entity';
import {Article} from '../article/models/article.entity';

@Controller('comment')
@ApiBearerAuth()
export class CommentController {
    constructor(private commentService: CommentService,
                @InjectRepository(Comment) private commentRepository: Repository<Comment>) {
    }

    @Get()
    @ApiOperation({title: 'Get List of All Comments'})
    @ApiResponse({status: 200, description: 'Comments Found.'})
    @ApiResponse({status: 404, description: 'No Comments found.'})
    showAllComments() {
        return this.commentService.showAll();
    }

    @Get(':id')
    @ApiOperation({title: 'Get a specific comment with the given id'})
    @ApiResponse({status: 200, description: 'Comment Found.'})
    @ApiResponse({status: 404, description: 'No Comment found.'})
    showCommentById(@Param('id') id: number) {
        return this.commentService.showOne(id);
    }

    @Post()
    @ApiOperation({title: 'Create a new comment'})
    @ApiResponse({status: 201, description: 'New comment has been created'})
    @ApiResponse({status: 400, description: 'Comment hasn\'t been created'})
    createComment(@CurrentUser('id') userId: number, @Body() data: CommentDto) {
        return this.commentService.create(userId, data);
    }

    @Put(':id')
    @ApiOperation({title: 'Update a comment'})
    @ApiResponse({status: 201, description: 'Comment has been updated'})
    @ApiResponse({status: 400, description: 'Comment hasn\'t been updated'})
    @ApiResponse({status: 404, description: 'No Comment found.'})
    updateComment(@Param('id') id: number, @Body() data: Partial<CommentDto>) {
        return this.commentService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({title: 'Delete a comment'})
    @ApiResponse({status: 200, description: 'Comment has been deleted'})
    @ApiResponse({status: 400, description: 'The comment hasn\'t been found'})
    @ApiResponse({status: 404, description: 'No Comment found.'})
    async deleteComment(@CurrentUser('id') userId: number, @Param('id') id: number) {
        if (userId) {
            const currentUser = await User.find({where: {id: userId}, relations: ['article']});
            const currentComment = await Comment.find({where: {id}});
            for (let i = 0; i <= currentUser[0].comment.length; i++) {
                if (currentUser[0].comment) {
                    if (currentUser[0].comment[i].id === currentComment[0].id) {
                        return this.commentService.destroy(id);
                    } else {
                        throw new HttpException('You can\'t update comments that not belongs to you', HttpStatus.UNAUTHORIZED);
                    }
                } else {
                    throw new HttpException('You don\'t have comments that belongs to you', HttpStatus.UNAUTHORIZED);
                }
            }
        } else {
            throw new HttpException('You can\'t update comments that not belongs to you', HttpStatus.UNAUTHORIZED);
        }
        throw new HttpException('You have to be logged in the app', HttpStatus.UNAUTHORIZED);
    }
}
