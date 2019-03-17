import {Injectable, Param} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CommentDto} from './comment.dto';
import {Comment} from './models/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

    async showAll() {
        return await this.commentRepository.find();
    }

    async create(userId: number, data: CommentDto) {
        data.userId = userId;
        const comment = await this.commentRepository.create(data);

        await this.commentRepository.save(comment);
        return comment;
    }

    async showOne(@Param('id') id: number) {
        return await this.commentRepository.findOne({where: {id}});
    }

    async update(@Param('id') id: number,  data: Partial<CommentDto>) {
        await this.commentRepository.update({id}, data);
        return await this.commentRepository.findOne({id});
    }

    async destroy(@Param('id') id: number) {
        await this.commentRepository.delete(id);
        return {deleted: true};
    }
}
