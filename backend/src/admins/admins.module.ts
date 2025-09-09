import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { Admin } from './entities/admin.entity';
import { Branch } from 'src/branches/entities/branch.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Branch]),
    AuthModule
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
