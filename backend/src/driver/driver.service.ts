import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  gateway: any;
   constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}
  async create(driver: Partial<Driver>): Promise<Driver> {
    const newDriver = this.driverRepository.create(driver);
    return this.driverRepository.save(newDriver);
  }

    async findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

    async findOne(id: string): Promise<Driver> {
   
    const driver = await this.driverRepository.findOne({where:{id:id }});
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }
  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const driver = await this.driverRepository.findOne({where:{id:id }});
        if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
      const updatedDriver = Object.assign(driver, updateDriverDto);
  return await this.driverRepository.save(updatedDriver);  
  }

async remove(id: string): Promise<{ message: string }> {
  const driver = await this.findOne(id);
  await this.driverRepository.remove(driver);
  return { message: `Driver with ID ${id} removed successfully` };
}

async updateCoordinates(id: string, coords: { latitude?: string; longitude?: string }): Promise<Driver> {
  const driver = await this.driverRepository.findOne({ where: { id } });
  if (!driver) throw new NotFoundException(`Driver with ID ${id} not found`);

  driver.location = coords;

  const updated = await this.driverRepository.save(driver);

  this.gateway.broadcastCoordinates(id, coords);
  return updated;
}

}
