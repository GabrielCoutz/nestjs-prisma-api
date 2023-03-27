import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/services/prisma/prisma.service';

import { UserRepository } from './user-repository';

const usersMockedList = [
  {
    email: 'user1@gmail.com',
    name: 'user1',
    password: '123456',
    id: '1',
  },
];

describe('UserRepository', () => {
  let prismaService: PrismaService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue(usersMockedList[0]),
              findMany: jest.fn().mockResolvedValue(usersMockedList),
              update: jest.fn().mockResolvedValue(usersMockedList[0]),
              findUnique: jest.fn().mockResolvedValue(usersMockedList[0]),
              delete: jest.fn(),
              count: jest.fn().mockResolvedValue(1),
            },
          },
        },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  describe('Create user', () => {
    it('should create', async () => {
      const result = await userRepository.create(usersMockedList[0]);

      expect(result).toStrictEqual(usersMockedList[0]);
    });
  });

  describe('Update user', () => {
    it('should update', async () => {
      const result = await userRepository.update(
        usersMockedList[0].id,
        usersMockedList[0],
      );

      expect(result).toStrictEqual(usersMockedList[0]);
    });
  });

  describe('Get user', () => {
    it('should get unique user', async () => {
      const result = await userRepository.getUniqueById(usersMockedList[0].id);

      expect(result).toStrictEqual(usersMockedList[0]);
    });

    it('should get all users', async () => {
      const result = await userRepository.getAll();

      expect(result).toStrictEqual(usersMockedList);
    });

    it('should find user by email', async () => {
      const result = await userRepository.findBy({
        email: usersMockedList[0].email,
      });

      expect(result).toBe(1);
    });
  });

  describe('Delete user', () => {
    it('should delete', async () => {
      const result = await userRepository.remove(usersMockedList[0].id);

      expect(result).toBe(undefined);
    });
  });
});
