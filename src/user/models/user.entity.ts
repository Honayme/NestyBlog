import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import {Comment} from '../../comment/comment.entity';
import {Article} from '../../article/article.entity';
import {UserRole} from './userRole.enum';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiModelProperty() id: number;

    @Column({ type: 'varchar', name: 'email', length: 100})
    @ApiModelProperty() email: string;

    @Column({ type: 'varchar', name: 'password'})
    @ApiModelProperty() password: string;

    @Column({ type: 'varchar', name: 'firstname', length: 100})
    @ApiModelProperty() firstname: string;

    @Column({ type: 'varchar', name: 'name', length: 100})
    @ApiModelProperty() name: string;

    @Column({ type: 'longtext', name: 'avatar', default: null })
    @ApiModelProperty() avatar: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.Standard})
    role: UserRole;

    @OneToMany(type => Comment, comment => comment.user)
    comment: Comment[];

    @OneToMany(type => Article, article => article.user)
    article: Article[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
