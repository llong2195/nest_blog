import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PerActionService } from './per_action.service';
import { CreatePerActionDto } from './dto/create-per_action.dto';
import { UpdatePerActionDto } from './dto/update-per_action.dto';
import { HttpStatus } from '@nestjs/common';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthenticationGuard)
@Controller('per-action')
export class PerActionController {
  constructor(private readonly perActionService: PerActionService) {}

  @Post()
  async create(@Body() createPerActionDto: CreatePerActionDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Success',
      data: await this.perActionService.create(createPerActionDto),
    };
  }

  @Get()
  async findAll(@Query() query) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.perActionService.findAll(query),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.perActionService.findOne(+id),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePerActionDto: UpdatePerActionDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.perActionService.update(+id, updatePerActionDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.perActionService.remove(+id),
    };
  }
}
