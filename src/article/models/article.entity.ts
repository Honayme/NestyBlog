import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn, BaseEntity,
} from 'typeorm';

import { User } from '../../user/models/user.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiModelProperty({ example: 1 }) id: number;

    @Column({ type: 'varchar', name: 'titre', length: 100})
    @ApiModelProperty({ example: 'Why php is more efficient than javascript ?' }) titre: string;

    @Column({ type: 'text', name: 'content'})
    @ApiModelProperty({ example: 'for many reasons i\'ll explain in the article' }) content: string;

    @Column({type: 'integer', default: 0})
    @ApiModelProperty({ example: 1 }) like: number;

    @Column({type: 'integer', default: 0})
    @ApiModelProperty({ example: 1 }) dislike: number;

    @ManyToOne(type => User, user => user.article)
    @ApiModelProperty({ example: 1 }) user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
