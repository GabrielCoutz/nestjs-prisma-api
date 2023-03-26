import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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

  async findBy(where: Prisma.UserWhereInput): Promise<number> {
    const result = await this.database.user.count({
      where,
    });

    return result;
  }
}
