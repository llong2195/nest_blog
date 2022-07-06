import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PerActionService } from './per_action.service';
import { CreatePerActionDto } from './dto/create-per_action.dto';
import { UpdatePerActionDto } from './dto/update-per_action.dto';

@Controller('per-action')
export class PerActionController {
  constructor(private readonly perActionService: PerActionService) {}

  @Post()
  create(@Body() createPerActionDto: CreatePerActionDto) {
    return this.perActionService.create(createPerActionDto);
  }

  @Get()
  findAll() {
    return this.perActionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perActionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePerActionDto: UpdatePerActionDto,
  ) {
    return this.perActionService.update(+id, updatePerActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perActionService.remove(+id);
  }
}
