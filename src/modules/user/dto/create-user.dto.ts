import { User } from '../entities/user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto extends User {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
