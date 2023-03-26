import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async update(id: string, payload: UpdateUserDto) {
    const userExists = await this.userRepository.findBy({ id });
    if (!userExists) throw new NotFoundException('User not found');

    if (payload.password)
      payload.password = await this.passwordService.hash(payload.password);

    const user = await this.userRepository.update(id, payload);

    return user;
  }

  async findAll() {
    const users = await this.userRepository.getAll();

    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.getUnique(id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async remove(id: string) {
    const userExists = await this.userRepository.findBy({ id });
    if (!userExists) throw new NotFoundException('User not found');

    await this.userRepository.remove(id);
  }
}
