import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { SuperTest } from 'supertest';
import * as request from 'supertest';
import { CommandBus } from '@nestjs/cqrs';
import { Users } from '../../src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Users', () => {
    let app: INestApplication;
    let superTest: SuperTest<any>;
    let commandBus: CommandBus;
    let users: Users;
    let userRepository: Repository<Users>;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ AppModule ],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
        superTest = request(app.getHttpServer());
        commandBus = app.get(CommandBus)

        userRepository = app.get(getRepositoryToken(Users));
    });

    afterEach(async () => {
        await Promise.all([
            userRepository.delete({}),
        ])
    })

    it('Post /users/create should create a user ', async () => {
        return superTest
        .post('/users/create')
        .send({
            name: "john",
            email: "hojn@gmailf.cfom",
            password: "changeme" 
        })
        .expect(201)
    });

    it('Patch /users/edit/:id should update a user ', async () => {
        return superTest
        .patch(`/users/edit/19`)
        .send({
            name: "john",
            email: "hojn@gmailf.cfom",
            password: "changeme" 
        })
        .expect(200)
    });

    it('delete /users/delete/:id should delete the user of given id ', () => {
        return superTest
        .delete(`/users/delete/19`)
        .expect(200)
    });

    it('Get /users/list should list all the users from db', async () => {
        const userList = await userRepository.find();
        return superTest
        .get('/users/list')
        .expect(200)
        .expect(({body}) => {
            expect(body).toEqual(userList)
        })
    });

    it('Get /users/:id should get a user with that id from db', async () => {
        const user = await userRepository.findOne(19);
        return superTest
        .get(`/users/19`)
        .expect(200)
        .expect(({body}) => {
            expect(body).toEqual(user)
        })
    });

    it('Get /users/:id should get a user with that id', () => {
        return superTest
        .get(`/users/19`)
        .expect(200)
        .expect(({body}) => {
            expect(body.data).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    email:expect.any(String),
                    password: expect.any(String),
                })
            )
        })
    });
});
