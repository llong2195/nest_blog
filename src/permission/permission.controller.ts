import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Permission } from './entities/permission.entity';

@ApiTags('permission1')
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
  findAll() {
    return this.permissionService.findAll();
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
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
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
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(+id, updatePermissionDto);
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
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
