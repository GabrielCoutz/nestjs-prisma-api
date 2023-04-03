import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../repository/user/user-repository';
import { PasswordService } from '../../services/password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
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

  async login(user: any) {
    const token = await this.jwtService.sign({ sub: user.id });

    return { token, id: user.id };
  }
}
