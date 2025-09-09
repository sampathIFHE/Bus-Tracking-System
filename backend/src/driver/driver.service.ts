import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { Branch } from 'src/branches/entities/branch.entity';
import { Bus } from 'src/buses/entities/bus.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
    private jwtService: JwtService,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
    @InjectRepository(Bus)
    private busRepository: Repository<Bus>,
  ) {}
  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const existingDriver = await this.driversRepository.findOne({
      where: { mobile: createDriverDto.mobile },
    });
    if (existingDriver) {
      throw new UnauthorizedException(
        'Driver with this mobile number already exists',
      );
    }

    const newDriver = {
      name: createDriverDto.name,
      mobile: createDriverDto.mobile,
    };

    if (createDriverDto.branchId && createDriverDto.branchId.trim() !== '') {
      const branch = await this.branchRepository.findOne({
        where: { id: createDriverDto.branchId },
      });

      if (!branch) {
        throw new NotFoundException(
          `Branch with ID ${createDriverDto.branchId} not found`,
        );
      }
      newDriver['branch'] = branch;
    }


 let bus: Bus | null = null;

  if (createDriverDto.busId?.trim()) {
    // Check if the bus exists
    bus = await this.busRepository.findOne({
      where: { id: createDriverDto.busId }});

    if (!bus) {
      throw new NotFoundException(
        `Bus with ID ${createDriverDto.busId} not found`,
      );
    }

    // Check if bus already has a driver assigned
    if (bus.driver) {
      throw new BadRequestException(
        `Bus with ID ${createDriverDto.busId} is already assigned to a driver`,
      );
    }
     let json = {
      id: bus.id,
      asassigned_no: bus.assigned_no,
    }
    newDriver['bus'] = json;
  }

    const driver = this.driversRepository.create(newDriver);
    const savedDriver = await this.driversRepository.save(driver);
    
    if (bus) {
      let json = {
        id: savedDriver.id,
        name: savedDriver.name,
        mobile: savedDriver.mobile,
      }
      bus.driver = json;
    await this.busRepository.save(bus);
    }
    return savedDriver;
  }

async  findAll(id:string): Promise<Driver[]> {    
 const drivers =  await this.driversRepository.find({
    where: { branch: { id } }, 
    relations: ['branch'], 
  });
  if (!drivers || drivers.length === 0) {
    throw new NotFoundException('No drivers found for this branch');    
  }
  return drivers;
  }

  async generateOtp(
    mobile: string,
  ): Promise<{ message: string; otp?: string }> {
    const driver = await this.driversRepository.findOne({
      where: { mobile },
    });

    if (!driver) {
      throw new NotFoundException('Driver not found with this mobile number');
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    await this.driversRepository.update(driver.id, { otp });
    console.log(`OTP updated in database: ${otp}`);
    return { message: 'OTP sent successfully', otp };
  }


  async verifyOtpAndLogin(
    mobile: string,
    otp: string,
  ): Promise<{ access_token: string }> {
    console.log(`Verifying OTP for mobile: ${mobile}, OTP provided: ${otp}`);
    const driver = await this.driversRepository.findOne({
      where: { mobile },
    });
    if (!driver) {
      console.log('Driver not found');
      throw new NotFoundException('Driver not found');
    }
    console.log(
      `Stored OTP: ${driver.otp}, Provided OTP: ${otp}`,
      typeof driver.otp,
      typeof otp,
    );
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
      busAssigned: driver.bus ? driver.bus?.assigned_no : null,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  findOne(id: string): Promise<string> {
    return this.driversRepository
      .findOneBy({ id: id })
      .then((driver) =>
        driver
          ? `Driver found: ${driver.name}`
          : `Driver with id ${id} not found`,
      );
  }

  update(id: string, updateDriverDto: UpdateDriverDto) {
    return this.driversRepository
      .update(id, updateDriverDto)
      .then((result) =>
        result.affected
          ? `Driver with id ${id} updated`
          : `Driver with id ${id} not found`,
      );
  }

async  remove(id: string): Promise<string> {
    return this.driversRepository
      .delete(id)
      .then((result) =>
        result.affected
          ? `Driver with id ${id} removed`
          : `Driver with id ${id} not found`,
      );
  }
}
