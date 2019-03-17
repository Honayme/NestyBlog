import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn, BaseEntity, ManyToMany, JoinTable,
} from 'typeorm';

import { User } from '../../user/models/user.entity';
import {Article} from '../../article/models/article.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class Rubric extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiModelProperty({ example: 1 }) id: number;

    @Column({ type: 'text', name: 'title'})
    @ApiModelProperty({ example: 'Un commentaire' }) content: string;

    @ManyToMany(type => Article)
    @JoinTable()
    categories: Article[];

    @ManyToOne(type => User, user => user.rubric)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
