import { Module } from '@nestjs/common';
import { ProductController } from '../../controllers/product/product.controller';
import { RepositoryModule } from '../repository/repository.module';
import { ProductService } from './product/product.service';

@Module({
  imports: [RepositoryModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
