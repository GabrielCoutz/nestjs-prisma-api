import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../repository/user/user-repository';

import { PasswordService } from '../../services/password/password.service';
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
  let passwordService: PasswordService;

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
            getUniqueById: jest.fn().mockResolvedValue(usersMockedList[0]),
            getUniqueByEmail: jest.fn().mockResolvedValue(usersMockedList[0]),
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
    passwordService = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(passwordService).toBeDefined();
  });

  describe('Create user', () => {
    it('should create', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(0);

      const result = await userService.create(usersMockedList[0]);

      expect(result.id).toBeDefined();
      expect(userRepository.create).toBeCalledTimes(1);
      expect(userRepository.findBy).toBeCalledTimes(1);
      expect(passwordService.hash).toBeCalledTimes(1);
    });

    it('should throw with email already in use', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(1);

      expect(userService.create(usersMockedList[0])).rejects.toThrowError(
        ConflictException,
      );
      expect(userRepository.findBy).toBeCalledTimes(1);
    });
  });

  describe('Get users', () => {
    it('should return all users', async () => {
      const result = await userService.findAll();

      expect(result).toStrictEqual(usersMockedList);
      expect(userRepository.getAll).toBeCalledTimes(1);
    });

    it('should return unique user', async () => {
      const result = await userService.findOne(usersMockedList[0].id);

      expect(result).toStrictEqual(usersMockedList[0]);
      expect(userRepository.getUniqueById).toBeCalledTimes(1);
    });

    it('should throw with user not found', async () => {
      jest
        .spyOn(userRepository, 'getUniqueById')
        .mockResolvedValueOnce(undefined);

      expect(userService.findOne(usersMockedList[0].id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(userRepository.getUniqueById).toBeCalledTimes(1);
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
      expect(userRepository.findBy).toBeCalledTimes(1);
      expect(passwordService.hash).toBeCalledTimes(1);
      expect(userRepository.update).toBeCalledTimes(1);
    });

    it('should throw with user not found', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(0);

      expect(userService.remove(usersMockedList[0].id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(userRepository.findBy).toBeCalledTimes(1);
    });
  });

  describe('Remove user', () => {
    it('should remove', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(1);

      await userService.remove(usersMockedList[0].id);
      expect(userRepository.findBy).toBeCalledTimes(1);
      expect(userRepository.remove).toBeCalledTimes(1);
    });

    it('should throw with user not found', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(0);

      expect(userService.remove(usersMockedList[0].id)).rejects.toThrowError(
        NotFoundException,
      );
      expect(userRepository.findBy).toBeCalledTimes(1);
    });
  });
});
