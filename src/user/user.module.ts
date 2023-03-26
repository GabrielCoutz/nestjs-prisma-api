import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RepositoryModule } from 'src/modules/repository/repository.module';
import { PasswordService } from 'src/services/password/password.service';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
