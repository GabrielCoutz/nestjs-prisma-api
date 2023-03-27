import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user/user.controller';

import { UserService } from 'src/modules/user/user.service';
import { PasswordService } from 'src/services/password/password.service';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
