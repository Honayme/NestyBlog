import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn, BaseEntity,
} from 'typeorm';

import { User } from '../../user/models/user.entity';
import {Article} from '../../article/models/article.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiModelProperty({ example: 1 }) id: number;

    @Column({ type: 'text', name: 'content'})
    @ApiModelProperty({ example: 'Un commentaire' }) content: string;

    @ManyToOne(type => User, user => user.comment)
    @ApiModelProperty({ example: 1 }) user: User;

    @ManyToOne(type => Article, user => user.user)
    @ApiModelProperty({ example: 1 }) article: Article;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
