import {forwardRef, HttpException, HttpStatus, Inject, Injectable, Param} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './models/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from './user.dto';
import {compare, genSalt, hash} from 'bcryptjs';
import {RegisterVm} from './models/register-vm.model';
import {LoginVm} from './models/login-vm.model';
import {JwtPayload} from '../shared/auth/jwt-payload';
import {AuthService} from '../shared/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @Inject(forwardRef(() => AuthService)) readonly authService: AuthService) {}

    async showAll() {
        return await this.userRepository.find();
    }

    async showOne(@Param('id') id: number) {
        return await this.userRepository.findOne({where: {id}});
    }

    async update(@Param('id') id: number,  data: Partial<UserDto>) {
        await this.userRepository.update({id}, data);
        return await this.userRepository.findOne({id});
    }

    async destroy(@Param('id') id: number) {
        await this.userRepository.delete(id);
        return {deleted: true};
    }
}