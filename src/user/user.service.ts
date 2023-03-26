import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user-repository';
import { PasswordService } from 'src/services/password/password.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async create({ email, name, password }: CreateUserDto) {
    const userAlreadyExists = await this.userRepository.findBy({ email });
    if (userAlreadyExists)
      throw new ConflictException('This email already in use');

    const user = await this.userRepository.create({
      email,
      name,
      password: await this.passwordService.hash(password),
    });

    return { id: user.id };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
