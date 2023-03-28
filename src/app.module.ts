import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
