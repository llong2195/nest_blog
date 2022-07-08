import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  context: string;

  @Type(() => Number)
  @IsNumber()
  blog_id: number;

  @IsOptional()
  @IsNumber()
  parent_id: number | null;
}
