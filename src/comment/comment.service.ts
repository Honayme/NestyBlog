import {Injectable, Param} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentDto} from './comment.dto';
import {Comment} from './models/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

    async create(userId: number, data: CommentDto) {
        data.userId = userId;
        const comment = await this.commentRepository.create(data);

        await this.commentRepository.save(comment);
        return comment;
    }
}
