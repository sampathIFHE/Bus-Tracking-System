import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';


@Injectable()
export class DriverService {
   constructor(
      @InjectRepository(Driver)
      private  driversRepository: Repository<Driver>,
      private jwtService: JwtService
    ) {}
async create(createDriverDto: CreateDriverDto):Promise<Driver> {
    const driver = this.driversRepository.create(createDriverDto);
    return this.driversRepository.save(driver);
  }

  findAll():Promise<Driver[]> {
    return this.driversRepository.find();
  }

async generateOtp(mobile: string): Promise<{ message: string, otp?: string }> {
    const driver = await this.driversRepository.findOne({ 
      where: { mobile } 
    });

    if (!driver) {
      throw new NotFoundException('Driver not found with this mobile number');
    }
    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    // Save OTP to driver record
  await this.driversRepository.update(driver.id, { otp });
console.log(`OTP updated in database: ${otp}`);
    return { message: 'OTP sent successfully', otp };
  }

  // Verify OTP and generate JWT token (valid for 7 days)
  async verifyOtpAndLogin(mobile: string, otp: string): Promise<{ access_token: string }> {
      console.log(`Verifying OTP for mobile: ${mobile}, OTP provided: ${otp}`);
    const driver = await this.driversRepository.findOne({ 
      where: { mobile } 
    });
    if (!driver) {
      
    console.log('Driver not found');
      throw new NotFoundException('Driver not found');
    }
      console.log(`Stored OTP: ${driver.otp}, Provided OTP: ${otp}`, typeof driver.otp, typeof otp);
  console.log(`OTP match: ${driver.otp === otp}`);
    if (driver.otp != otp) {
          console.log('OTP mismatch');
      throw new UnauthorizedException('Invalid OTP');
    }
    driver.otp = '';
    await this.driversRepository.save(driver);
    const payload = {
      sub: driver.id,
      mobile: driver.mobile,
      userType: 'driver',
      name: driver.name,
      busAssigned: driver.BusAssigned
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  findOne(id: string):Promise<string> {
    return this.driversRepository.findOneBy({ id: (id) })
      .then(driver => driver ? `Driver found: ${driver.name}` : `Driver with id ${id} not found`);
  }

  update(id: string, updateDriverDto: UpdateDriverDto) {
    return this.driversRepository.update(id, updateDriverDto)
      .then(result => result.affected ? `Driver with id ${id} updated` : `Driver with id ${id} not found`);
  }

  remove(id: string):Promise<string> {
    return this.driversRepository.delete(id)
      .then(result => result.affected ? `Driver with id ${id} removed` : `Driver with id ${id} not found`); 
      }
}
