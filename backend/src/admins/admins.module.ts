import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Branch } from 'src/branches/entities/branch.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Admin,Branch])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
