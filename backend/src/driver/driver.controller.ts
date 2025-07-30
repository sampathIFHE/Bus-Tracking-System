import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { DriverService } from './driver.service';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
import { LocationJsonDto } from './dto/create-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

    @Post()
  create(@Body() driverData: Partial<Driver>): Promise<Driver> {
    return this.driverService.create(driverData);
  }

 @Get()
  findAll(): Promise<Driver[]> {
    return this.driverService.findAll();
  }

 @Get(':id')
  findOne(@Param('id') id: string): Promise<Driver> {
    return this.driverService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto):Promise<Driver> {
    return this.driverService.update(id, updateDriverDto);
  }

 @Delete(':id')
remove(@Param('id') id: string): Promise<{ message: string }> {
  return this.driverService.remove(id);
}

  @Patch(':id/location')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateLocation(
    @Param('id') id: string,
    @Body() locationDto: LocationJsonDto,
  ) {
    return this.driverService.updateCoordinates(id, locationDto);
  }
}
