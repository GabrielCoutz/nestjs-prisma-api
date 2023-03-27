import { Module } from '@nestjs/common';
import { UserRepository } from '../../repository/user/user-repository';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
  imports: [],
  providers: [UserRepository, PrismaService],
  exports: [UserRepository],
})
export class RepositoryModule {}
