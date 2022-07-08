import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform(({ obj }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(obj.isAnnotate) > -1;
  })
  @IsBoolean()
  // @Type(() => Boolean)
  isPublished?: boolean;
}
