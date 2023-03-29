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
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { JwtAuthGuard } from '../../modules/auth/guard/jwt-auth.guard';
import { CreateProductDto } from '../../modules/product/dto/create-product.dto';
import { UpdateProductDto } from '../../modules/product/dto/update-product.dto';
import { ProductService } from '../../modules/product/product/product.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ description: 'Product created successfully' })
  create(@Request() { user }, @Body() CreateProductDto: CreateProductDto) {
    return this.productService.create(user.userId, CreateProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiOkResponse({ description: 'Product found successfully' })
  findUnique(@Param('id') id: string) {
    return this.productService.findUnique(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiOkResponse({ description: 'Product updated successfully' })
  update(@Param('id') id: string, @Body() UpdateProductDto: UpdateProductDto) {
    return this.productService.update(id, UpdateProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiNoContentResponse({ description: 'Product deleted successfully' })
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
