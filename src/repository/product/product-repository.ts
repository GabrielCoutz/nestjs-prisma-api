import { Injectable } from '@nestjs/common';
import { Product } from 'src/modules/product/entities/product-entity';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { productDefaultSelect } from '../selects/product-default-select';

@Injectable()
export class ProductRepository {
  constructor(private readonly database: PrismaService) {}

  async create(userId: string, { name, price, description }: Product) {
    const product = await this.database.product.create({
      data: {
        name,
        price,
        description,
        userId,
      },
      select: productDefaultSelect,
    });

    return product;
  }

  async getAll() {
    const products = await this.database.product.findMany({
      select: productDefaultSelect,
    });

    return products;
  }

  async getUnique(id: string) {
    const product = await this.database.product.findUnique({
      where: { id },
      select: productDefaultSelect,
    });

    return product;
  }
}
