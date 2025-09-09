import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserCategory } from "src/buses/entities/bus.entity";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    mobile: string;

    @IsNotEmpty()
    @IsString()
    branchID: string;

    @IsNotEmpty()
    @IsString()
    busID: string;

    @IsNotEmpty()
    @IsString()
    stop: string;   

    @IsNotEmpty()
    @IsString()
    created_by: string;

    @IsOptional()
    @IsEnum(UserCategory)
    user_category: UserCategory;

    @IsOptional()
    user_ID: string;

    @IsOptional()
    employee_category: string;

    @IsOptional()
    valid_till: string;

    @IsOptional()
    isActive:boolean;

}
