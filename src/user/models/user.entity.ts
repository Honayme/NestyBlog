import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BaseEntity,
} from 'typeorm';
import {Comment} from '../../comment/models/comment.entity';
import {Article} from '../../article/models/article.entity';
import {UserRole} from './userRole.enum';
import {ApiModelProperty} from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiModelProperty({ example: 1 }) id: number;

    @Column({ type: 'varchar', name: 'email', length: 100})
    @ApiModelProperty({ example: 'jDoe@mail.com' }) email: string;

    @Column({ type: 'varchar', name: 'password'})
    @ApiModelProperty({ example: 'Dragon1234Password' }) password: string;

    @Column({ type: 'varchar', name: 'firstname', length: 100})
    @ApiModelProperty({ example: 'John' }) firstname: string;

    @Column({ type: 'varchar', name: 'name', length: 100})
    @ApiModelProperty({ example: 'Doe' }) name: string;

    @Column({ type: 'longtext', name: 'avatar', default: null })
    @ApiModelProperty() avatar: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.Standard})
    @ApiModelProperty({ example: 'standard' }) role: UserRole;

    @OneToMany(type => Comment, comment => comment.userId)
    @ApiModelProperty({ example: 'Great article' }) comment: Comment[];

    @OneToMany(type => Article, article => article.author)
    @ApiModelProperty({ example: 'An awesome article write by my own hand' }) article: Article[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
