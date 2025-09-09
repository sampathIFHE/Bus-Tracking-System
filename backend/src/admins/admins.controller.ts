import { Controller, Get, Post, Body, Patch, Param, Delete,} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Public } from 'src/auth/decorators/public.decorator';


@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }
  @Public()
  @Post('verify-otp')
  verifyOtp(@Body() body:{mobile:string,otp:string}){
  return this.adminsService.verifyOTP(body.mobile,body.otp)
  }


  @Public()
  @Post('request-otp')
  requestOtp(@Body() body:{mobile:string}){
  return this.adminsService.generateOtp(body.mobile)
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }
}
