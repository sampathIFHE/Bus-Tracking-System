import { Module } from '@nestjs/common';
import { BusesService } from './buses.service';
import { BusesController } from './buses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { BusesGateway } from './buses.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Bus])],  
  controllers: [BusesController],
  providers: [BusesService, BusesGateway,],
})
export class BusesModule {}
