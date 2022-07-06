import { Injectable } from '@nestjs/common';
import { CreateBlogCatDto } from './dto/create-blog_cat.dto';
import { UpdateBlogCatDto } from './dto/update-blog_cat.dto';

@Injectable()
export class BlogCatService {
  create(createBlogCatDto: CreateBlogCatDto) {
    return 'This action adds a new blogCat';
  }

  findAll() {
    return `This action returns all blogCat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogCat`;
  }

  update(id: number, updateBlogCatDto: UpdateBlogCatDto) {
    return `This action updates a #${id} blogCat`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogCat`;
  }
}
