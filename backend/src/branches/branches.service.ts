import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private branchesRepository: Repository<Branch>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const branch = this.branchesRepository.create(createBranchDto);
    return await this.branchesRepository.save(branch);
  }

  async findAll(): Promise<Branch[]> {
    return await this.branchesRepository.find();
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
