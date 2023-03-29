import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from '../../services/password/password.service';
import { UserRepository } from '../../repository/user/user-repository';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

const userMock = {
  email: 'envkt@example.com',
  password: '123456',
  id: '123',
};

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let passwordService: PasswordService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthService],
      providers: [
        {
          provide: UserRepository,
          useValue: {
            getUniqueByEmail: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: PasswordService,
          useValue: {
            compare: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue(userMock.id),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    passwordService = module.get<PasswordService>(PasswordService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(passwordService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('validateUser method', () => {
    it('should return user id with correct credentials', async () => {
      const result = await authService.validateUser(
        userMock.email,
        userMock.password,
      );

      expect(userRepository.getUniqueByEmail).toBeCalledTimes(1);
      expect(passwordService.compare).toBeCalledTimes(1);

      expect(typeof result.id).toEqual('string');
    });

    it('should return false with email not found', async () => {
      jest.spyOn(userRepository, 'getUniqueByEmail').mockResolvedValue(null);

      const result = await authService.validateUser(
        'any_email',
        userMock.password,
      );

      expect(userRepository.getUniqueByEmail).toBeCalledTimes(1);
      expect(result).toEqual(false);
    });

    it('should return false with incorrect password', async () => {
      jest.spyOn(passwordService, 'compare').mockResolvedValue(false);

      const result = await authService.validateUser(
        userMock.email,
        'any_password',
      );

      expect(userRepository.getUniqueByEmail).toBeCalledTimes(1);
      expect(passwordService.compare).toBeCalledTimes(1);
      expect(result).toEqual(false);
    });
  });

  describe('login method', () => {
    it('should return token', async () => {
      const result = await authService.login(userMock);

      expect(jwtService.sign).toBeCalledTimes(1);
      expect(result).toStrictEqual({ token: userMock.id });
    });
  });
});
