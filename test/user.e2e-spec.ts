import * as request from 'supertest';
import {Test} from '@nestjs/testing';
import {AppModule} from './../src/app.module';
import {INestApplication} from '@nestjs/common';

describe('UserController (e2e)', () => {
    let app: INestApplication;
    let userService = {
        create: () => [
            {
                email: 'honayme@gmail.com',
                password: 'clearpassword',
                firstname: 'thomas',
                name: 'mirabile',
                avatar: 'unAvatar',
                role: 'standard',
                createdAt: '2019-02-07T14:19:00.283Z',
                updatedAt: '2019-02-07T14:19:00.283Z',
            },
        ],
    };

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (POST)', () => {
        return request(app.getHttpServer())
            .post('/')
            .send({
                query: `{
                  users {
                    name : "test"
                  }
                }`,
            })
            .expect(200)
            .expect('{"data":{"users":[{"name":"test"}]}}');
    });


});
