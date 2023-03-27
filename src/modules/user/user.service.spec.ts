import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from 'src/repository/user/user-repository';

import { PasswordService } from '../password/password.service';
import { UserService } from './user.service';

const usersMockedList = [
  {
    email: 'user1@gmail.com',
    name: 'user1',
    password: '123456',
    id: '1',
  },
];

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(usersMockedList[0]),
            getAll: jest.fn().mockResolvedValue(usersMockedList),
            update: jest.fn().mockResolvedValue(usersMockedList[0]),
            getUnique: jest.fn().mockResolvedValue(usersMockedList[0]),
            remove: jest.fn(),
            findBy: jest.fn().mockResolvedValue(usersMockedList[0]),
          },
        },
        {
          provide: PasswordService,
          useValue: {
            hash: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create user', () => {
    it('should create', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(0);

      const result = await userService.create(usersMockedList[0]);

      expect(result.id).toBeDefined();
      expect(userRepository.create).toBeCalled();
    });

    it('should throw with email already in use', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(1);

      expect(userService.create(usersMockedList[0])).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('Get users', () => {
    it('should return all users', async () => {
      const result = await userService.findAll();

      expect(result).toStrictEqual(usersMockedList);
      expect(userRepository.getAll).toBeCalled();
    });

    it('should return unique user', async () => {
      const result = await userService.findOne(usersMockedList[0].id);

      expect(result).toStrictEqual(usersMockedList[0]);
      expect(userRepository.getUnique).toBeCalled();
    });

    it('should throw with user not found', async () => {
      jest.spyOn(userRepository, 'getUnique').mockResolvedValueOnce(undefined);

      expect(userService.findOne(usersMockedList[0].id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('Update user', () => {
    it('should update', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(1);

      const result = await userService.update(
        usersMockedList[0].id,
        usersMockedList[0],
      );

      expect(result).toStrictEqual(usersMockedList[0]);
      expect(userRepository.update).toBeCalled();
    });

    it('should throw with user not found', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(0);

      expect(userService.remove(usersMockedList[0].id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('Remove user', () => {
    it('should remove', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(1);

      await userService.remove(usersMockedList[0].id);
    });

    it('should throw with user not found', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(0);

      expect(userService.remove(usersMockedList[0].id)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
