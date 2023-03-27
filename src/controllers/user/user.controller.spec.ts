import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../modules/user/user.service';
import { UserController } from './user.controller';

const usersMockedList = [
  {
    email: 'user1@gmail.com',
    name: 'user1',
    password: '123456',
  },
];

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(usersMockedList[0]),
            update: jest.fn().mockResolvedValue(usersMockedList[0]),
            findAll: jest.fn().mockResolvedValue(usersMockedList),
            findOne: jest.fn().mockResolvedValue(usersMockedList[0]),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('Create user', () => {
    it('should create', async () => {
      const result = await userController.create(usersMockedList[0]);

      expect(result).toStrictEqual(usersMockedList[0]);
      expect(userService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw with empty fields', async () => {
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());

      expect(
        userController.create({
          email: '',
          name: '',
          password: '',
        }),
      ).rejects.toThrowError();
      expect(userService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update user', () => {
    it('should update', async () => {
      const result = await userController.update('123', usersMockedList[0]);

      expect(result).toStrictEqual(usersMockedList[0]);
      expect(userService.update).toHaveBeenCalledTimes(1);
    });

    it('should throw', async () => {
      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());

      expect(
        userController.update('123', {
          email: '',
          name: '',
          password: '',
        }),
      ).rejects.toThrowError();
      expect(userService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get user', () => {
    it('should get unique', async () => {
      const result = await userController.findOne('123');

      expect(result).toStrictEqual(usersMockedList[0]);
      expect(userService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should get all users', async () => {
      const result = await userController.findAll();

      expect(result).toStrictEqual(usersMockedList);
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw', async () => {
      jest.spyOn(userService, 'findOne').mockRejectedValueOnce(new Error());

      expect(userController.findOne('123')).rejects.toThrowError();
      expect(userService.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete user', () => {
    it('should delete', async () => {
      const result = await userController.remove('123');

      expect(result).toEqual(undefined);
      expect(userService.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw', async () => {
      jest.spyOn(userService, 'remove').mockRejectedValueOnce(new Error());

      expect(userController.remove('123')).rejects.toThrowError();
      expect(userService.remove).toHaveBeenCalledTimes(1);
    });
  });
});
