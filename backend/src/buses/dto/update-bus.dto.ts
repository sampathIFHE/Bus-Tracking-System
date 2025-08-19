import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class UpdateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsString()
  @IsNotEmpty()
  speed: string;

  @IsString()
  @IsNotEmpty()
  accuracy: string;
}