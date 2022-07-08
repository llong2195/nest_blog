import { IsNumber } from 'class-validator';

export class CreateBlogTagDto {
  @IsNumber()
  blog_id: number;

  @IsNumber()
  tag_id: number;
}
