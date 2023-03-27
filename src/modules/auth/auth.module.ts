import { Module } from '@nestjs/common';
import { UserRepository } from 'src/repository/user/user-repository';
import { AuthService } from 'src/modules/auth/auth.service';
import { PasswordService } from 'src/services/password/password.service';
import { RepositoryModule } from '../repository/repository.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  imports: [RepositoryModule],
  providers: [
    AuthService,
    PasswordService,
    UserRepository,
    LocalStrategy,
    PrismaService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
