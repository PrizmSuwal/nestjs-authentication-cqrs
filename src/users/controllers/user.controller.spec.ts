import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { AddUserHandler } from '../commands/handlers/add-user.handler';
import { AddUserCommand } from '../commands/impl/add-user.command';
import { GetAllUsers } from '../queries/get-user';
import { GetAllUsersHandler } from '../queries/handlers/get-user.handlers';
import { usersDTO } from '../users.dto';
import { usercontroller } from '../users.service';
import { UsersController } from './user.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [UsersController],
      providers: [
        AddUserCommand,
        AddUserHandler,
        GetAllUsers,
        GetAllUsersHandler, 
        {
          provide: usercontroller,
          useValue: {
            addUser: jest.fn().mockImplementation((user: usersDTO) =>
              Promise.resolve({ 
                userid: 1, 
                username: 'Ram', 
                password: 'passwordcheck'
              }),
            ),

            listUser: jest.fn().mockResolvedValue([
              {
                userId: 1,
                username: 'john',
                password: 'changeme',
              },
              {
                  userId: 2,
                  username: 'chris',
                  password: 'secret',
              },
              {
                  userId: 3,
                  username: 'maria',
                  password: 'guess',
              },
            ])
          }
        },
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('add a user to mock', () => {
    it('should create a user', async () => {
      const newUserDTO: usersDTO = {
        userId: 1,
        username: "Ram",
        password: "passwordcheck"
      };
      const returnData = await controller.addUser(newUserDTO);
      expect(returnData).toEqual({
        userid: 1,
        username: "Ram",
        password: "passwordcheck"
      });
    })
  })

  describe('list all the users', () => {
    it('should return an array of json ', async () => {
      await expect(controller.listUser()).resolves.toEqual([
        {
          userId: 1,
          username: 'john',
          password: 'changeme',
        },
        {
            userId: 2,
            username: 'chris',
            password: 'secret',
        },
        {
            userId: 3,
            username: 'maria',
            password: 'guess',
        },  
      ])
    })
  })
});
