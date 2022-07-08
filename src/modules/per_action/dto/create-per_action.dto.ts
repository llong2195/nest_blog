import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { Table_Name } from '../entities/per_action.entity';

export class CreatePerActionDto {
  @Transform(({ obj }) => {
    return parseInt(obj.per_id) || 0;
  })
  @Type(() => Number)
  @IsNumber()
  per_id: number;

  @Transform(({ obj }) => {
    return parseInt(obj.action_id) || 0;
  })
  @Type(() => Number)
  @IsNumber()
  action_id: number;

  @IsEnum(Table_Name)
  table_name: Table_Name;
}
