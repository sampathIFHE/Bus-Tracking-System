import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDriverDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    mobile: string;
    
    @IsString()
    @IsOptional()
    busId: string;

    @IsString()
    @IsOptional()
    branchId: string;

    @IsString()
    @IsOptional()
    otp: string;
}
