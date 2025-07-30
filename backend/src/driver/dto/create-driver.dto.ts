
import { IsString, IsOptional } from 'class-validator';

export class LocationJsonDto {
  @IsOptional()
  @IsString()
  longitude?: string;

  @IsOptional()
  @IsString()
  latitude?: string;
}

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsString()
  mobile: string;

  @IsOptional()
  @IsString()
  otp:string;

  @IsOptional()
  location?: LocationJsonDto;
}
