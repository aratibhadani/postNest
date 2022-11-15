import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class PaginationParamsDTO {
    @ApiProperty()
    @IsNotEmpty({ message: 'Page is required' })
    @IsNumber()
    @Type(() => Number)
    page: number;
  
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    count: number;
  
    @ApiProperty()
    @ValidateIf((o) => o.sort)
    @IsEnum(
      { ASC: 'asc', DESC: 'desc' },
      { message: 'Sort order must be asc or desc' },
    )
    sort: string;
  
    @ApiProperty()
    @ValidateIf((o) => o.sortby)
    sortby: string;
  
    @ApiProperty()
    @ValidateIf((o) => o.search)
    @IsString()
    search: string;
  }