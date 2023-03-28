import { Module } from '@nestjs/common';
import { ProductRepository } from 'src/repository/product/product-repository';
import { UserRepository } from '../../repository/user/user-repository';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
  imports: [],
  providers: [UserRepository, PrismaService, ProductRepository],
  exports: [UserRepository, ProductRepository],
})
export class RepositoryModule {}
