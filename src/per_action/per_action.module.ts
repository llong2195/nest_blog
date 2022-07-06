import { Module } from '@nestjs/common';
import { PerActionService } from './per_action.service';
import { PerActionController } from './per_action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerAction } from './entities/per_action.entity';

@Module({
  controllers: [PerActionController],
  providers: [PerActionService],
  imports: [TypeOrmModule.forFeature([PerAction])],
})
export class PerActionModule {}
