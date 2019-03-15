import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import * as sinon from 'sinon';
import {User} from './models/user.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserDto} from './user.dto';

describe('UserService', () => {
    let userService: UserService;
    let sandbox: sinon.SinonSandbox;

    beforeAll(async () => {
        sandbox = sinon.createSandbox();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: sinon.createStubInstance(Repository),
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
    });
    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    it('should call showAll method with expected param', async () => {
        const findAllNotesSpy = jest.spyOn(userService, 'showAll');
        userService.showAll();
        expect(findAllNotesSpy).toHaveBeenCalledWith();
    });

    it('should call showOne method with expected param', async () => {
        const findOneUserSpy = jest.spyOn(userService, 'showOne');
        const showOneOptions = 2;
        userService.showOne(showOneOptions);
        expect(findOneUserSpy).toHaveBeenCalledWith(showOneOptions);
    });
    it('should call updateUser method with expected params', async () => {
        const updateUserSpy = jest.spyOn(userService, 'update');
        const userId = 2;
        const dto = new UserDto();
        userService.update(userId, dto);
        expect(updateUserSpy).toHaveBeenCalledWith(userId, dto);
    });
