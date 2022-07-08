import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  slug: string | null;
}
