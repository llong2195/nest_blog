import { IsString } from 'class-validator';

export class CreateActionDto {
  @IsString()
  name: string;
}
