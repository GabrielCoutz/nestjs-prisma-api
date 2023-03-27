import { Module } from '@nestjs/common';
import { UserController } from '../../controllers/user/user.controller';

import { UserService } from '../../modules/user/user.service';
import { PasswordService } from '../../services/password/password.service';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
