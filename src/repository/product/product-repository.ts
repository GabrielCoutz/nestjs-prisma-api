import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly database: PrismaService) {}

  async getAll() {
    const products = await this.database.product.findMany();

    return products;
  }
}
