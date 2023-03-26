import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repository/user-repository';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [],
  providers: [UserRepository, PrismaService],
  exports: [UserRepository],
})
export class RepositoryModule {}
