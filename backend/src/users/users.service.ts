import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Branch } from 'src/branches/entities/branch.entity';
import { Bus } from 'src/buses/entities/bus.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Branch)
    private branchesRepository: Repository<Branch>,
    @InjectRepository(Bus)
    private busesRepository: Repository<Bus>,
  ) {}
  
async  create(createUserDto: CreateUserDto):Promise<User> {
  const existingUser = await this.usersRepository.findOne({where:{mobile:createUserDto.mobile}});
  if(existingUser){
    throw new UnauthorizedException('User with this mobile number already exists');
  }
  const newUser = {
    name: createUserDto.name,
    mobile: createUserDto.mobile,
    stop: createUserDto.stop,
    created_by: createUserDto.created_by,
    user_category: createUserDto.user_category as any, 
    user_ID: createUserDto.user_ID,
    employee_category: createUserDto.employee_category as any, 
    valid_till: createUserDto.valid_till,
  }

  if (createUserDto.branchID && createUserDto.branchID.trim() !== '') {
    const branch = await this.branchesRepository.findOne({where:{id:createUserDto.branchID}});
    if (!branch) {
      throw new NotFoundException(`Branch with ID ${createUserDto.branchID} not found`);
    }
    newUser['branch'] = branch;
  }

  let bus: any = null;
  if (createUserDto.busID && createUserDto.busID.trim() !== '') {
     bus = await this.busesRepository.findOne({where:{id:createUserDto.busID}});
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${createUserDto.busID} not found`);
    }
    let json = {
      id: bus.id,
      asassigned_no: bus.assigned_no,
    }
    newUser['bus'] = json;
  }
  const user = this.usersRepository.create(newUser);
  await this.usersRepository.save(user);
  bus?.user?.push(user.id)
  await this.busesRepository.update(createUserDto.busID, bus)
  return user;

  }


async findAll(id: string): Promise<User[]> {
  const users = await this.usersRepository.find({
    where: { branch: { id } }, 
    relations: ['branch'], 
  });
  if (!users || users.length === 0) {
    throw new NotFoundException('No users found for this branch');
  }
  return users;
}


async findOne(id: string):Promise<User | null> {
   const user = this.usersRepository.findOne({where:{id:id},relations:['branch','bus']});
   if(!user){
    throw new NotFoundException('User not found');
   }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const updatePayload: any = { ...updateUserDto };
    if (updateUserDto.user_category !== undefined) {
      updatePayload.user_category = 'student';
    }
    await this.usersRepository.update(id, updatePayload);
    return this.findOne(id);
  }

async  remove(id: string):Promise<string> {
return await this.usersRepository.delete(id).then((result) =>
        result.affected
          ? `Driver with id ${id} removed`
          : `Driver with id ${id} not found`,
      );
  }
}
