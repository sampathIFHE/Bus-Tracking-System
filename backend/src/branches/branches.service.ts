import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Bus } from 'src/buses/entities/bus.entity';
import { Driver } from 'src/driver/entities/driver.entity';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private branchesRepository: Repository<Branch>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Bus)
    private busesRepository: Repository<Bus>,
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const branch = this.branchesRepository.create(createBranchDto);
    return await this.branchesRepository.save(branch);
  }

  async findAll(): Promise<Branch[]> {
    return await this.branchesRepository.find();
  }

async findAllWithRelations(id:string): Promise<string> {
  const drivers = await this.driversRepository.find({ where: { branch: { id } }, relations: ['branch'] });
  const buses = await this.busesRepository.find({ where: { branch: { id } }, relations: ['branch'] });
  const users = await this.usersRepository.find({ where: { branch: { id } }, relations: ['branch'] });

  const json:any = {
    drivers: drivers.length,
    buses: buses.length,
    users: users.length
  }
  return json
}

  async findOne(id: string): Promise<Branch> {
    const branch = await this.branchesRepository.findOne({ where: { id } });
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    return branch;
  }

  async update(id: string, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    await this.branchesRepository.update(id, updateBranchDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<Branch> {
    const branch = await this.findOne(id);
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    await this.branchesRepository.delete(id);
    return branch;
  }
}
