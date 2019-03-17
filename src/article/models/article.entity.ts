import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { User } from '../../user/models/user.entity';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', name: 'titre', length: 100})
    titre: string;

    @Column({ type: 'text', name: 'content'})
    content: string;

    @Column()
    like: number;

    @Column()
    dislike: number;

    @ManyToOne(type => User, user => user.article)
    author: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
