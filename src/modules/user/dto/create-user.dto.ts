import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(5, 20)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 15)
  phonenumber: string;

  @Transform(({ obj }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(obj.isAnnotate) > -1;
  })
  @IsBoolean()
  @Type(() => Boolean)
  gender: boolean;

  @IsOptional()
  @Transform(({ obj }) => {
    // console.log('obj');
    return parseInt(obj.per_id) || 0;
  })
  @IsInt()
  @Type(() => Number)
  per_id: number;
}
