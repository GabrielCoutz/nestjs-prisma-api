import { User } from '../entities/user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto extends User {
  /**
   * The email needs to be in the correct format. Strings that are not in email format, as in the example, will not be accepted.
   * @example exemple@gmail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
