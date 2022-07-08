import { Controller } from '@nestjs/common';
import { BlogFileService } from './blog_file.service';
@Controller('blog-file')
export class BlogFileController {
  constructor(private readonly blogFileService: BlogFileService) {}
}
