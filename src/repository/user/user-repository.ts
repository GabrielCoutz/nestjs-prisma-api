import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from '../../modules/user/entities/user.entity';
import { PrismaService } from '../../services/prisma/prisma.service';

import { userDefaultSelect } from '../selects/user-default-select';

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
      select: userDefaultSelect,
    });

    return user;
  }

  async getAll() {
    const users = await this.database.user.findMany({
      select: userDefaultSelect,
    });

    return users;
  }

  async update(id: string, payload: Prisma.UserUpdateInput) {
    const user = await this.database.user.update({
      where: { id },
      data: payload,
      select: userDefaultSelect,
    });

    return user;
  }

  async getUniqueById(id: string, optionalSelect?: Prisma.UserSelect) {
    const user = await this.database.user.findUnique({
      where: { id },
      select: { ...userDefaultSelect, ...optionalSelect },
    });

    return user;
  }

  async getUniqueByEmail(email: string, optionalSelect?: Prisma.UserSelect) {
    const user = await this.database.user.findUnique({
      where: { email },
      select: { ...userDefaultSelect, ...optionalSelect },
    });

    return user;
  }

  async remove(id: string) {
    await this.database.user.delete({
      where: { id },
    });
  }

  async findBy(where: Prisma.UserWhereInput): Promise<number> {
    const result = await this.database.user.count({
      where,
    });

    return result;
  }
}
