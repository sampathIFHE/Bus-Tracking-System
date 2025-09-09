import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from 'src/branches/entities/branch.entity';
import { User } from './entities/user.entity';
import { Bus } from 'src/buses/entities/bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch,User, Bus])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
