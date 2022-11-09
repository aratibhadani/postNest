import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    type: String,
    description: 'post Name Enter',
    example: 'post description',
  })
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'content Enter',
    example: 'post description add',
  })
  @IsNotEmpty({ message: 'content is required' })
  @IsString()
  content: string;

  @ApiProperty({
    type: String,
    description: 'image Enter',
    example: 'image add',
  })
  @IsNotEmpty({ message: 'image is required' })
  @IsString()
  image: string;
}
