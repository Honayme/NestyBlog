import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne, CreateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(type => User, user => user.comment)
    user: User;
}