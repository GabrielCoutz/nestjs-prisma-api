import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../modules/auth/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ token: '123' }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  it('should return token', async () => {
    const result = await authController.login({ id: '123' });

    expect(authService.login).toBeCalledTimes(1);
    expect(result.token).toEqual('123');
  });
});
