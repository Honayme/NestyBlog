import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentService} from './comment.service';
import {Comment} from './models/comment.entity';
import {CommentDto} from './comment.dto';
import {CurrentUser} from '../shared/decorators/user.decorator';
import {Roles} from '../shared/decorators/roles.decorator';

@Controller('comment')
@ApiBearerAuth()
export class CommentController {
    constructor(private commentService: CommentService,
                @InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

    @Post()
    @ApiOperation({title: 'Create a new comment'})
    @ApiResponse({ status: 201, description: 'New comment has been created'})
    @ApiResponse({ status: 400, description: 'Comment hasn\'t been created'})
    createComment(@CurrentUser('id') userId: number, @Body() data: CommentDto) {
        return this.commentService.create(userId, data);
    }
}
