import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UpdateUserDto  {
    @ApiProperty({
        type: String,
        description: 'Name Enter',
        example: 'ram',
      })
      @IsString()
      @IsNotEmpty({ message: 'Password id is required' })
      firstName: string;
    
      @ApiProperty({
        type: String,
        description: 'Name last Enter',
        example: 'patel',
      })
      @IsNotEmpty({ message: 'Last Name is required' })
      @IsString()
      lastName: string;
    
      @ApiProperty({
        type: String,
        description: 'Name last Enter',
        example: 'patel@gmail.com',
      })
      @IsString()
      @IsNotEmpty({ message: 'Email is required' })
      @IsEmail()
      email: string;
    
      @ApiProperty({
        type: String,
        description: 'Contact no Enter',
        example: '78567890344',
      })
      @IsNotEmpty({ message: 'Conatct No is required' })
      contactno: string;
    
      @ApiProperty({
        type: Boolean,
        description: 'enter status',
        example: 1,
      })
      @IsNotEmpty({ message: 'Status is required' })
      @IsNumber()
      isActive: number;

}
