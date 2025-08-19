import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateLocationDto } from './dto/update-bus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusesService {
    constructor(
    @InjectRepository(Bus)
    private  busesRepository: Repository<Bus>,
  ) {}

    async create(createBusDto: CreateBusDto): Promise<Bus> {
    const bus = this.busesRepository.create(createBusDto);
    return await this.busesRepository.save(bus);
  }

  async findAll(): Promise<Bus[]> {
    return await this.busesRepository.find();
  }

  async findOne(id: string): Promise<Bus> {
    const bus = await this.busesRepository.findOne({ where: { id } });
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }
    return bus;
  }

  async update(id: string, updateBusDto: UpdateLocationDto): Promise<Bus> {
    await this.busesRepository.update(id, updateBusDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.busesRepository.delete(id);
  }

  async updateLocation(busId: string, updateData: UpdateLocationDto): Promise<Bus> {
  const updatePayload = {
    longitude: updateData.longitude,
    latitude: updateData.latitude,
    speed: updateData.speed,
    accuracy: updateData.accuracy,
    last_updated: new Date().toISOString()
  };
  
  await this.busesRepository.update(busId, updatePayload);
  return this.findOne(busId);
}

async getBusLocation(busId: string): Promise<{ 
  longitude: number; 
  latitude: number 
}> {
  const bus = await this.findOne(busId);
  return {
    longitude: bus.longitude,
    latitude: bus.latitude
  };
}
}
