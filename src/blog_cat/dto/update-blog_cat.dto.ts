import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogCatDto } from './create-blog_cat.dto';

export class UpdateBlogCatDto extends PartialType(CreateBlogCatDto) {}
