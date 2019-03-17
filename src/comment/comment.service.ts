import {Injectable, Param} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentDto} from './comment.dto';
import {Comment} from './models/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

    async destroy(@Param('id') id: number) {
        await this.commentRepository.delete(id);
        return {deleted: true};
    }
}
