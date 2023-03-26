import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly database: PrismaService) {}

  async create({ email, name, password }: User) {
    const user = await this.database.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return user;
  }
}
