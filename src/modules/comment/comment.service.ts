import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Blog } from '../blog/entities/blog.entity';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private CommentRepository: Repository<Comment>,
  ) {}
  create(req: any, createCommentDto: CreateCommentDto) {
    const createComment = new Comment();
    const blog = new Blog();
    blog.id = createCommentDto.blog_id;
    createComment.blog_ = blog;

    createComment.parent_id = createCommentDto.parent_id;

    createComment.context = createCommentDto.context;
    console.log(req.user.id);
    const user = new User();
    user.id = req.user.id;
    createComment.user_ = user;

    return this.CommentRepository.save(createComment).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  findAllByBlog(blog_id: number, query: any) {
    const option = {
      skip: 0,
      take: 5,
    };
    if ('page' in query) {
      const page = parseInt(query.page) || 1;
      const limit = 5;
      const skip = limit * (page - 1);
      option['skip'] = skip;
      option['take'] = limit;
    }
    console.log(option);
    const sql = `SELECT * FROM nest_blog.comment
    where blog_id = ${blog_id} limit ${option.skip}, ${option.take}`;
    return this.CommentRepository.query(sql).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  findOne(id: number) {
    return this.CommentRepository.findOneBy({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const updateComment = new Comment();
    if (!updateCommentDto.context) {
      throw new HttpException('Context is not null', HttpStatus.BAD_REQUEST);
    }
    updateComment.context = updateCommentDto.context;
    return this.CommentRepository.update(id, updateComment).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  remove(id: number) {
    return this.CommentRepository.delete({ id: id }).catch((err) => {
      throw new HttpException(
        err.sqlMessage || 'BAD_REQUEST',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
