import {forwardRef, HttpException, HttpStatus, Inject, Injectable, Param} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './models/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from './dto/user.dto';
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

    async create(data: UserDto) {
        const salt = await genSalt(10);
        data.password = await hash(data.password, salt);

        const user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        // https://docs.nestjs.com/techniques/file-upload
        return user;
    }

    async login(loginVm: LoginVm) {
        const {email, password} = loginVm;

        const user = await this.userRepository.findOne({where: {email}});

        if (!user) {
            throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
        }

        // const isMatch = await compare(password, user.password);
        //
        // if (!isMatch) {
        //     throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
        // }

        const payload: JwtPayload = {
            id: user.id,
            role: user.role,
        };

        const token = await this.authService.signPayload(payload);

        return {
            token,
            user,
        };
    }

    async register(registerVm: RegisterVm): Promise<User> {
        const {email, password, firstname, name, role} = registerVm;

        const newUser = new User();
        newUser.email = email;
        newUser.firstname = firstname;
        newUser.name = name;
        newUser.role = role;

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);

        return await this.create(newUser);
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
