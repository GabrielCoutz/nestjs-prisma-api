import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';

import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { UpdateUserDto } from '../../modules/user/dto/update-user.dto';
import { JwtAuthGuard } from '../../modules/auth/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger/dist';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User created successfully' })
  @ApiConflictResponse({ status: 409, description: 'Email already in use' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOkResponse({ description: 'User found successfully' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiOkResponse({ description: 'User updated successfully' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiNoContentResponse({ description: 'User deleted successfully' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
