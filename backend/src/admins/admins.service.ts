import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { Branch } from 'src/branches/entities/branch.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>
  ) {}  

async create(createAdminDto: CreateAdminDto): Promise<Admin> {

  const existingAdmin = await this.adminsRepository.findOne({
    where: { mobile: createAdminDto.mobile }
  });

  if (existingAdmin) {
    throw new ConflictException(`Admin with mobile number ${createAdminDto.mobile} already exists`);
  }

  const admin = this.adminsRepository.create({
    name: createAdminDto.name,
    mobile: createAdminDto.mobile,
    role: createAdminDto.role,
    created_by: createAdminDto.created_by,
    otp: createAdminDto.otp,
    last_login: createAdminDto.last_login,

  });


  if (createAdminDto.branchId && createAdminDto.branchId.trim() !== '') {
    const branch = await this.branchRepository.findOne({
      where: { id: createAdminDto.branchId }
    });
    
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${createAdminDto.branchId} not found`);
    }
    admin.branch = branch; 
  }

  return await this.adminsRepository.save(admin);
}

 async findAll(): Promise<Admin[]> {
    return await this.adminsRepository.find({relations: ['branch']});
  }

async  findOne(id: string):Promise<Admin> {
  const admin = await this.adminsRepository.findOne({where: {id}, relations: ['branch']});
  if(!admin){
    throw new NotFoundException('Admin not found');
  }
  return admin
}

async  update(id: string, updateAdminDto: UpdateAdminDto):Promise<Admin> {
await this.adminsRepository.update(id, updateAdminDto);
return this.findOne(id);
}

async   remove(id: string):Promise<string> {
  const admin = await await this.adminsRepository.findOne({where: {id}, relations: ['branch']});
  if(!admin){ 
    throw new NotFoundException('Admin not found');
  }
 await this.adminsRepository.delete(id);
  return 'Admin deleted successfully';
  }
}
