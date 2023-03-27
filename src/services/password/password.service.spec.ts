import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;
  let password: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Hash password', () => {
    it('should hash a password', async () => {
      const result = await service.hash('my_password');

      expect(typeof result).toEqual('string');
      expect(result).toBeTruthy();

      password = result;
    });
  });

  describe('Compare password', () => {
    it('should return true with valid password', async () => {
      const result = await service.compare('my_password', password);

      expect(result).toBeTruthy();
    });

    it('should return false with invalid password', async () => {
      const result = await service.compare('invalid_password', password);

      expect(result).toBeFalsy();
    });
  });
});
