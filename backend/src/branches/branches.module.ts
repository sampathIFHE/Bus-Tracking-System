import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { User } from 'src/users/entities/user.entity';
import { Bus } from 'src/buses/entities/bus.entity';
import { Driver } from 'src/driver/entities/driver.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Branch,User,Bus,Driver])],
  controllers: [BranchesController],
  providers: [BranchesService],
})
export class BranchesModule {}
