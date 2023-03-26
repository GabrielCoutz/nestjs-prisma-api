import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RepositoryModule } from 'src/modules/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
