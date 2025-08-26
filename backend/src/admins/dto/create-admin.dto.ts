import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AdminRole } from "../entities/admin.entity";

export class CreateAdminDto {
     
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    branchId: string;

    @IsNotEmpty()
    @IsString()
    mobile: string;

    @IsString()
    @IsOptional()
    created_by: string;

    @IsString()
    @IsOptional()
    last_login: string;

    @IsString()
    @IsOptional()
    otp: string;

    @IsEnum(AdminRole)
    @IsOptional()
    role: AdminRole;
}
