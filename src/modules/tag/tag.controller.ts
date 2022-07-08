import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  @ApiOperation({ summary: 'Create Tag' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'CREATED.',
    type: Tag,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'BAD_REQUEST.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'BAD_REQUEST.' })
  async create(@Body() createTagDto: CreateTagDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Success',
      data: await this.tagService.create(createTagDto),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get Tags' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK.', type: [Tag] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'BAD_REQUEST.' })
  async findAll(@Query() query) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.tagService.findAll(query),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Tag By Id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK.', type: Tag })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'BAD_REQUEST.' })
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.tagService.findOne(+id),
    };
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update Tag By Id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'BAD_REQUEST.' })
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.tagService.update(+id, updateTagDto),
    };
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Tag By Id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'BAD_REQUEST.' })
  async remove(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.tagService.remove(+id),
    };
  }
}
