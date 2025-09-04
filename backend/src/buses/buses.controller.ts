import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusesService } from './buses.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateLocationDto } from './dto/update-bus.dto';

@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}

  @Post()
  create(@Body() createBusDto: CreateBusDto) {
    return this.busesService.create(createBusDto);
  }

  @Get(':id')
  findAll(@Param('id') id:string) {
    return this.busesService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusDto: UpdateLocationDto) {
    return this.busesService.update(id, updateBusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busesService.remove(id);
  }
}
