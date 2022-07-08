import { Controller } from '@nestjs/common';
import { BlogCatService } from './blog_cat.service';

@Controller('blog-cat')
export class BlogCatController {
  constructor(private readonly blogCatService: BlogCatService) {}
}
