import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../../repository/product/product-repository';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(userId: string, payload: CreateProductDto) {
    const product = await this.productRepository.create(userId, payload);

    return product;
  }

  async findAll() {
    const products = await this.productRepository.getAll();

    return products;
  }

  async findUnique(id: string) {
    const product = await this.productRepository.getUnique(id);
    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async update(id: string, payload: UpdateProductDto) {
    const productExists = await this.productRepository.getUnique(id);
    if (!productExists) throw new NotFoundException('Product not found');

    const product = await this.productRepository.update(id, payload);

    return product;
  }

  async delete(id: string) {
    const productExists = await this.productRepository.getUnique(id);
    if (!productExists) throw new NotFoundException('Product not found');

    await this.productRepository.delete(id);
  }
}
