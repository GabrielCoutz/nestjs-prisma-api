import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'src/repository/product/product-repository';
import { CreateProductDto } from '../dto/create-product.dto';

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
}
