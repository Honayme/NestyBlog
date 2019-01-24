import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
