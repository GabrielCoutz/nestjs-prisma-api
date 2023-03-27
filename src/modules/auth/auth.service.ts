import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user/user-repository';
import { PasswordService } from 'src/services/password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.getUniqueByEmail(email, {
      password: true,
    });

    if (!user) return false;

    const passwordIsValid = await this.passwordService.compare(
      password,
      user.password,
    );

    if (!passwordIsValid) return false;

    return { id: user.id };
  }
}
