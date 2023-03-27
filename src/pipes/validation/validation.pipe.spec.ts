import { CreateUserDto } from '../../user/dto/create-user.dto';
import { ValidationPipe } from './validation.pipe';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';

const userData = {
  email: 'email@example.com',
  name: 'example',
  password: '123456',
};

describe('VadationPipe', () => {
  let target: ValidationPipe;
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: CreateUserDto,
    data: '',
  };

  beforeEach(() => {
    target = new ValidationPipe();
  });

  it('should throw BadRequest with empty fields', async () => {
    expect(
      target.transform(
        <CreateUserDto>{ email: '', name: '', password: '' },
        metadata,
      ),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should pass and return user data', async () => {
    const result = await target.transform(<CreateUserDto>userData, metadata);

    expect(result).toStrictEqual(userData);
  });
});
