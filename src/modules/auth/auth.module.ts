import { Module } from '@nestjs/common';
import { UserRepository } from '../../repository/user/user-repository';
import { AuthService } from '../../modules/auth/auth.service';
import { PasswordService } from '../../services/password/password.service';
import { RepositoryModule } from '../repository/repository.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from '../../controllers/auth/auth.controller';
import { PrismaService } from '../../services/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    RepositoryModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    PasswordService,
    UserRepository,
    LocalStrategy,
    PrismaService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
