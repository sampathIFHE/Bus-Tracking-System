import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserCategory } from '../entities/bus.entity';

export class CreateBusDto {
  @IsString()
  @IsNotEmpty()
  assigned_no: string;

  @IsString()
  @IsNotEmpty()
  registration_no: string;

  @IsString()
  @IsOptional()
  no_of_seats?: number;

  @IsOptional()
  coordinator?: {
    id: string;
    name: string;
    mobile: string;
  };

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsString()
  @IsOptional()
  accuracy?: string;

  @IsString()
  @IsOptional()
  speed?: string;

  @IsString()
  @IsOptional()
  last_updated?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  passengers?: string[];

  @IsEnum(UserCategory)
  @IsOptional()
  category?: UserCategory;

  @IsOptional()
  driver?: any;

  @IsOptional()
  tempory_driver?: {
    id: string;
    name: string;
    mobile: string;
  };

  @IsString()
  @IsNotEmpty()
  route: string;

  @IsString()
  @IsOptional()
  current_stop?: string;

  @IsString()
  @IsOptional()
  branchId: string;
}
