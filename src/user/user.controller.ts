import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, ReflectMetadata, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {UserDto} from './user.dto';
import {ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse} from '@nestjs/swagger';
import {RegisterVm} from './models/register-vm.model';
import {User} from './models/user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {LoginResponseVm} from './models/login-response-vm.model';
import {LoginVm} from './models/login-vm.model';
import {RolesGuard} from '../shared/guards/roles.guard';
import {AuthGuard} from '@nestjs/passport';
import {Roles} from '../shared/decorators/roles.decorator';
import {CurrentUser} from '../shared/decorators/user.decorator';


@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(private userService: UserService,
                @InjectRepository(User) private userRepository: Repository<User>) {}

    @Get()
    @ApiOperation({title: 'Get List of All Users'})
    @ApiResponse({ status: 200, description: 'Users Found.'})
    @ApiResponse({ status: 404, description: 'No Users found.'})
    @Roles('admin')
    showAllUser() {
        return this.userService.showAll();
    }

    @Get(':id')
    @ApiOperation({title: 'Get a user by the given id'})
    @ApiResponse({ status: 200, description: 'User Found.'})
    @ApiResponse({ status: 404, description: 'No User found.'})
    @UseGuards(AuthGuard('jwt'))
    showUserById(@CurrentUser('id') userId: number, @Param('id') id: number) {
        if (userId) {
            id = userId;
        }

        return this.userService.showOne(id);
    }
    @Put(':id')
    @ApiOperation({title: 'Update an existing user with the given id'})
    @ApiResponse({ status: 200, description: 'The user has been updated'})
    @ApiResponse({ status: 400, description: 'The user hasn\'t been updated'})
    @ApiResponse({ status: 404, description: 'No Users found.'})
    updateUser(@CurrentUser('id') userId: number, @Param('id') id: number, @Body() data: Partial<UserDto>) {
        if (userId) {
            id = userId;
        }

        return this.userService.update(id, data);
    }
