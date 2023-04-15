import { PartialType } from '@nestjs/mapped-types';
import { ProductImages } from '@prisma/client';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  name?: string;
  price?: number;
  description?: string;
  images?: ProductImages[];
}
