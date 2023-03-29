/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Request,
  Post,
  UseGuards,
  HttpCode,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { LoginUserDto } from '../../modules/auth/dto/login-user.dto';
import { AuthService } from '../../modules/auth/auth.service';

import { LocalAuthGuard } from '../../modules/auth/guard/local-auth.guard';

@ApiTags('login')
@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'Logged successfully' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Request() req, @Body() payload: LoginUserDto) {
    return this.authService.login(req.user);
  }
}
