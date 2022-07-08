import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
  Request,
  Query,
} from '@nestjs/common';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(
    @Request() req: any,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.commentService.create(req, createCommentDto),
    };
  }

  @Get(':blog_id')
  async findAllByBlog(
    @Query() query,
    @Param('blog_id', ParseIntPipe) blog_id: string,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.commentService.findAllByBlog(+blog_id, query),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.commentService.findOne(+id),
    };
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.commentService.update(+id, updateCommentDto),
    };
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.commentService.remove(+id),
    };
  }
}
