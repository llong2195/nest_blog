import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @Transform(({ obj }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(obj.isAnnotate) > -1;
  })
  @IsBoolean()
  isPublished: boolean;

  @Transform(({ obj }) => {
    return parseInt(obj.user_id) || 0;
  })
  @Type(() => Number)
  @IsNumber()
  user_id: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  tag_id?: number[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  category_id?: number[];
}
