import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    type: String,
    description: 'post Name Enter',
  })
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({
    type: String,
    description: 'content Enter',
  })
  @IsNotEmpty({ message: 'content is required' })
  @IsString()
  content: string;

  @ApiProperty({ type: 'file' })
  file: any;
}
