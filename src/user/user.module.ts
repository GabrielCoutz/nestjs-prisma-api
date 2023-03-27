import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { RepositoryModule } from '../modules/repository/repository.module';
import { PasswordService } from '../services/password/password.service';
import { UserService } from 'src/services/user/user.service';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
