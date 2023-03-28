import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repository/product/product-repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll() {
    const products = await this.productRepository.getAll();

    return products;
  }
}
