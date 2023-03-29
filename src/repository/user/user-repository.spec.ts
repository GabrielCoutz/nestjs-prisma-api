import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../services/prisma/prisma.service';

import { UserRepository } from './user-repository';

const usersMocked = {
  email: 'user1@gmail.com',
  name: 'user1',
  password: '123456',
  id: '1',
};

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
              create: jest.fn().mockResolvedValue(usersMocked),
              findMany: jest.fn().mockResolvedValue([usersMocked]),
              update: jest.fn().mockResolvedValue(usersMocked),
              findUnique: jest.fn().mockResolvedValue(usersMocked),
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
      const result = await userRepository.create(usersMocked);

      expect(result).toStrictEqual(usersMocked);
      expect(prismaService.user.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update user', () => {
    it('should update', async () => {
      const result = await userRepository.update(usersMocked.id, usersMocked);

      expect(result).toStrictEqual(usersMocked);
      expect(prismaService.user.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get user', () => {
    it('should get unique user', async () => {
      const result = await userRepository.getUniqueById(usersMocked.id);

      expect(result).toStrictEqual(usersMocked);
      expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should get all users', async () => {
      const result = await userRepository.getAll();

      expect(result).toStrictEqual([usersMocked]);
      expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
    });

    it('should get user by email', async () => {
      const result = await userRepository.getUniqueByEmail(usersMocked.email);

      expect(result).toBe(usersMocked);
      expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should find user', async () => {
      const result = await userRepository.findBy({ email: usersMocked.email });

      expect(result).toBe(1);
      expect(prismaService.user.count).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete user', () => {
    it('should delete', async () => {
      const result = await userRepository.remove(usersMocked.id);

      expect(result).toBe(undefined);
      expect(prismaService.user.delete).toHaveBeenCalledTimes(1);
    });
  });
});
