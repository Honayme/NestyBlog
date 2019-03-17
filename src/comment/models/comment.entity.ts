import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/models/user.entity';
import {Article} from '../../article/models/article.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @ManyToOne(type => User, user => user.comment)
    userId: User;

    @ManyToOne(type => Article, user => user.author)
    article: Article;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
