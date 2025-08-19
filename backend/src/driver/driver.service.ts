import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
   constructor(
      @InjectRepository(Driver)
      private  driversRepository: Repository<Driver>,
    ) {}
async create(createDriverDto: CreateDriverDto):Promise<Driver> {
    const driver = this.driversRepository.create(createDriverDto);
    return this.driversRepository.save(driver);
  }

  findAll():Promise<Driver[]> {
    return this.driversRepository.find();
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
