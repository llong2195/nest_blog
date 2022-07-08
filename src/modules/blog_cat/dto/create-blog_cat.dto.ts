import { IsNumber } from 'class-validator';

export class CreateBlogCatDto {
  @IsNumber()
  blog_id: number;

  @IsNumber()
  cat_id: number;
}
