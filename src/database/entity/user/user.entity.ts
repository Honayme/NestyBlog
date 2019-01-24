import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

import {Comment} from '../comment/comment.entity';

export enum Type {
    Admin = 'admin',
    Author = 'author',
    Standard = 'standard',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', name: 'email', length: 100})
    email: string;

    @Column({ type: 'varchar', name: 'password'})
    password: string;

    @Column({ type: 'varchar', name: 'firstname', length: 100})
    firstname: string;

    @Column({ type: 'varchar', name: 'name', length: 100})
    name: string;

    @Column({ type: 'longtext', name: 'avatar'})
    avatar: string;

    @Column({ type: 'enum', enum: Type, default: Type.Standard})
    role: Type;

    @OneToMany(type => Comment, comment => comment.user)
    comment: Comment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
