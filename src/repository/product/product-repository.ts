import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from '../../modules/product/dto/update-product.dto';
import { Product } from '../../modules/product/entities/product-entity';
import { PrismaService } from '../../services/prisma/prisma.service';
import {
  productConsultSelect,
  productDefaultSelect,
} from '../selects/product-default-select';

@Injectable()
export class ProductRepository {
  constructor(private readonly database: PrismaService) {}

  async create(userId: string, { name, price, description, images }: Product) {
    const product = await this.database.product.create({
      data: {
        name,
        price,
        description,
        userId,
        images: {
          createMany: {
            data: images,
          },
        },
      },
      select: productDefaultSelect,
    });

    return product;
  }

  async getAll() {
    const products = await this.database.product.findMany({
      select: productConsultSelect,
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

  async update(id: string, payload: UpdateProductDto) {
    const imagesUpdatePayload = payload?.images?.length
      ? { data: payload.images }
      : undefined;
    const imagesDeletePayload = imagesUpdatePayload
      ? {
          productId: {
            equals: id,
          },
        }
      : undefined;

    const product = await this.database.product.update({
      where: { id },
      data: {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        images: {
          deleteMany: imagesDeletePayload,
          createMany: imagesUpdatePayload,
        },
      },
      select: productDefaultSelect,
    });

    return product;
  }

  async delete(id: string) {
    await this.database.product.delete({
      where: { id },
    });
  }
}
