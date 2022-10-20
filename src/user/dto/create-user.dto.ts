import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Name Enter',
    example: 'ram',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Name last Enter',
    example: 'patel',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Name last Enter',
    example: 'rampatel@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: Boolean,
    description: 'enter status',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;
}
