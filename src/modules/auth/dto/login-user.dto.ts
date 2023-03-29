import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  /**
   * The email needs to be in the correct format. Strings that are not in email format, as in the example, will not be accepted.
   * @example exemple@gmail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
