import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth.service';
import { LocalStrategy } from './local.strategy';

const userMock = {
  email: 'test@example.com',
  password: '123456',
};

describe('localStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalStrategy],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn().mockResolvedValue(userMock),
          },
        },
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('validate method', () => {
    it('should return user with valid credentials', async () => {
      const result = await localStrategy.validate(
        userMock.email,
        userMock.password,
      );

      expect(authService.validateUser).toBeCalledTimes(1);
      expect(result).toStrictEqual(userMock);
    });

    it('should throw UnauthorizedException with invalid credentials', () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(false);

      expect(
        localStrategy.validate(userMock.email, userMock.password),
      ).rejects.toThrowError(UnauthorizedException);
      expect(authService.validateUser).toBeCalledTimes(1);
    });
  });
});
