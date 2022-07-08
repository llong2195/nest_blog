import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @Transform(({ obj }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(obj.isAnnotate) > -1;
  })
  @IsBoolean()
  isPublished: boolean;

  @Transform(({ obj }) => {
    return parseInt(obj.parent_id) || 0;
  })
  @Type(() => Number)
  @IsNumber()
  parent_id: number;
}
