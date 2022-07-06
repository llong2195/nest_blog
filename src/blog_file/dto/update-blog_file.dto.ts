import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogFileDto } from './create-blog_file.dto';

export class UpdateBlogFileDto extends PartialType(CreateBlogFileDto) {}
