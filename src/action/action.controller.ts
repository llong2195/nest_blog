import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActionService } from './action.service';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { HttpStatus } from '@nestjs/common';
import { Action } from './entities/action.entity';

@ApiTags('action')
@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post()
  @ApiOperation({ summary: 'Create Action' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'CREATED.',
    type: Action,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'BAD_REQUEST.' })
  create(@Body() createActionDto: CreateActionDto) {
    return this.actionService.create(createActionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get Actions' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'OK.',
    type: [Action],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'BAD_REQUEST.' })
  async findAll(@Query() query) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.actionService.findAll(query),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Action By Id' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'OK.', type: Action })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'BAD_REQUEST.' })
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.actionService.findOne(+id),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Action By Id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Update Action By Id' })
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateActionDto: UpdateActionDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.actionService.update(+id, updateActionDto),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Action By Id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Delete Action By Id' })
  async remove(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.actionService.remove(+id),
    };
  }
}
