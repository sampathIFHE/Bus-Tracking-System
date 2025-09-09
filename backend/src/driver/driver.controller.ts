import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.driverService.findAll(id);
  }

    @Post('request-otp')
  requestOtp(@Body() body: { mobile: string }) {
    return this.driverService.generateOtp(body.mobile);
  }

  @Post('verify-otp')
  verifyOtp(@Body() body: { mobile: string; otp: string }) {
    return this.driverService.verifyOtpAndLogin(body.mobile, body.otp);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(id);
  }
}
