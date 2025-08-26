import {  IsNotEmpty, IsString } from "class-validator";

export class CreateBranchDto {

    @IsString()
    @IsNotEmpty()
    city: string;

    
}
