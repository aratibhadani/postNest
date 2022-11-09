import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    type: String,
    description: 'Name last Enter',
    example: 'patel@gmail.com',
  })
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({ message: 'Email enter in Proper Formate..' })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password Enter',
    example: 'admin@123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
