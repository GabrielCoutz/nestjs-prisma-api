import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repository/user/user-repository';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  imports: [],
  providers: [UserRepository, PrismaService],
  exports: [UserRepository],
})
export class RepositoryModule {}
