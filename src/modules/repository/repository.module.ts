import { Module } from '@nestjs/common';
import { UserRepository } from '../../repository/user-repository';
import { PrismaService } from '../../services/prisma.service';

@Module({
  imports: [],
  providers: [UserRepository, PrismaService],
  exports: [UserRepository],
})
export class RepositoryModule {}
