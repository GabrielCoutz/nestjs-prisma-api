import { Controller, Request, Post, UseGuards, HttpCode } from '@nestjs/common';

import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';

@Controller('login')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post()
  async login(@Request() req) {
    return req.user;
  }
}
