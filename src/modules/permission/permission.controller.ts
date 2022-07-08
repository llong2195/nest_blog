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
  UseGuards,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthenticationGuard)
@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ApiOperation({ summary: 'Create Permission' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'CREATED.',
    type: Permission,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'BAD_REQUEST.',
  })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get Permissions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Permissions',
    type: [Permission],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'BAD_REQUEST.',
  })
  async findAll(@Query() query: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.permissionService.findAll(query),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Permission By Id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Permission By Id',
    type: Permission,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'BAD_REQUEST.',
  })
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.permissionService.findOne(+id),
    };
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update Permission By Id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'BAD_REQUEST.',
  })
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.permissionService.update(+id, updatePermissionDto),
    };
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete Permission By Id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'BAD_REQUEST.',
  })
  async remove(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: await this.permissionService.remove(+id),
    };
  }
}
