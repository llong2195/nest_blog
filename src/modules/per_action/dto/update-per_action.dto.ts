import { PartialType } from '@nestjs/mapped-types';
import { CreatePerActionDto } from './create-per_action.dto';

export class UpdatePerActionDto extends PartialType(CreatePerActionDto) {}
