import {UserController} from './user.controller';
import {UserService} from './user.service';
import {Test} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {User} from './models/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from './user.dto';
import {UserRole} from './models/userRole.enum';

class UserServiceMock {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }
}

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [{
                provide: UserService,
                useValue: UserServiceMock,
            }],
        }).compile();

        // Get the userController and userService in the Testing Module Context
        userService = module.get<UserService>(UserService);
        userController = module.get<UserController>(UserController);
    });

    describe('findAll()', () => {
        it('should return an array of users', async () => {
            const user = [
                {
                    id: 2,
                    email: 'honayme@gmail.com',
                    password: 'clearpassword',
                    firstname: 'thomas',
                    name: 'mirabile',
                    avatar: 'unAvatar',
                    role: 'standard',
                    createdAt: '2019-02-07T14:19:00.283Z',
                    updatedAt: '2019-02-07T14:19:00.283Z',
                },
                {
                    id: 3,
                    email: 'honaymelelumineux@gmail.com',
                    password: 'honaymepassword',
                    firstname: 'thomas',
                    name: 'Honayme',
                    avatar: 'Lelumineux',
                    role: 'standard',
                    createdAt: '2019-02-07T14:19:38.238Z',
                    updatedAt: '2019-02-07T14:19:38.238Z',
                },
            ];
            // Inject la valeur user dans le retour du service
            userService.showAll = jest.fn().mockResolvedValue(user);

            const result = await userController.showAllUser();
            // Test le retour du service à l'appel du controlleur
            expect(await userController.showAllUser()).toBe(result);
        });
    });

    describe('showUserById()', () => {
        it('should return a users with the given id', async () => {
            const user = {
                id: 2,
                email: 'honayme@gmail.com',
                password: 'clearpassword',
                firstname: 'thomas',
                name: 'mirabile',
                avatar: 'unAvatar',
                role: 'standard',
                createdAt: '2019-02-07T14:19:00.283Z',
                updatedAt: '2019-02-07T14:19:00.283Z',
            };

            // Inject la valeur user dans le retour du service
            userService.showOne = jest.fn().mockResolvedValue(user);

            const result = await userController.showUserById(2);
            // Test le retour du service à l'appel du controlleur
            expect(await userController.showUserById(2)).toBe(result);
        });
    });
    describe('updateUser()', () => {
        it('should return a users who just have been updated', async () => {
            const user: UserDto = {
                id: 2,
                email: 'honayme@gmail.com',
                password: 'clearpassword',
                firstname: 'thomas',
                name: 'mirabile',
                avatar: 'unAvatar',
                role: UserRole.Standard,
            };

            const userUpdated: UserDto = {
                id: 2,
                email: 'honayme@gmail.com',
                password: 'clearpassword',
                firstname: 'updatedFirstname',
                name: 'updatedName',
                avatar: 'unAvatar',
                role: UserRole.Standard,
            };

            const updatedData = {
                firstname: 'updatedFirstname',
                name: 'updatedName',
            };
            // Inject la valeur user dans le retour du service
            userService.update = jest.fn().mockResolvedValue(user);

            const result = await userController.updateUser(2, updatedData);
            // Test le retour du service à l'appel du controlleur
            expect(await userController.updateUser(2, updatedData)).toBe(result);
        });
    });

    describe('deleteUser()', () => {
        it('should return a users who just have been deleted', async () => {
            const user: UserDto = {
                id: 2,
                email: 'honayme@gmail.com',
                password: 'clearpassword',
                firstname: 'thomas',
                name: 'mirabile',
                avatar: 'unAvatar',
                role: UserRole.Standard,
            };

            // Inject la valeur user dans le retour du service
            userService.destroy = jest.fn().mockResolvedValue(user);

            const result = await userController.deleteUser(2);
            // Test le retour du service à l'appel du controlleur
            expect(await userController.deleteUser(2)).toBe(result);
        });
    });

});
