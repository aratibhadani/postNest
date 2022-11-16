import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class PaginationParamsDTO {
  @ApiProperty({default: 1,required: false})
  @IsNotEmpty({ message: 'Page is required' })
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty({required: false})
  @IsNumber()
  @Type(() => Number)
  count: number;

  @ApiProperty({ enum: ['ASC', 'DESC'],default:'ASC',required: false})
  @ValidateIf((o) => o.sort)
  @IsEnum(
    { ASC: 'asc', DESC: 'desc' },
    { message: 'Sort order must be asc or desc' },
  )
  sort: string;

  @ApiProperty({required: false})
  @ValidateIf((o) => o.sortby)
  @IsOptional()
  sortby: string;

  @ApiProperty({required: false})
  @ValidateIf((o) => o.search)
  @IsString()
  @IsOptional()
  search: string;
}