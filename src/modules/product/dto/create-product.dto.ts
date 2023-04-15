import { ProductImages } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Product } from '../entities/product-entity';

export class CreateProductDto extends Product {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  description?: string;

  @ValidateNested()
  @IsNotEmpty()
  images: ProductImages[];
}
