import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  Request,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../modules/auth/guard/jwt-auth.guard';
import { CreateProductDto } from '../../modules/product/dto/create-product.dto';
import { UpdateProductDto } from '../../modules/product/dto/update-product.dto';
import { ProductService } from '../../modules/product/product/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() { user }, @Body() CreateProductDto: CreateProductDto) {
    return this.productService.create(user.userId, CreateProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findUnique(@Param('id') id: string) {
    return this.productService.findUnique(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateProductDto: UpdateProductDto) {
    return this.productService.update(id, UpdateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
