import { Controller, Request, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';

import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
