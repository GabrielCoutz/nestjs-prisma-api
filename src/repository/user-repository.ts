import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import { User } from '../user/entities/user.entity';
import { userDefaultSelect } from './selects/user-default-select';

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

  async getUnique(id: string) {
    const user = await this.database.user.findUnique({
      where: { id },
      select: userDefaultSelect,
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
