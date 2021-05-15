import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationQueryDTO {
  @ApiPropertyOptional({
    type: Number,
    default: process.env.DEFAULT_LIMIT_PAGINATION,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  limit: number;

  @ApiPropertyOptional({
    type: Number,
    default: process.env.DEFAULT_OFFSET_PAGINATION,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset: number;
}
