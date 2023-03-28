import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { ProductService } from 'src/modules/product/product/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() { user },
    @Body() CreateProductDto: CreateProductDto,
  ) {
    return await this.productService.create(user.userId, CreateProductDto);
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
}
