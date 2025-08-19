import { IsNotEmpty, IsString } from "class-validator";

export class CreateDriverDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    mobile: string;
    
    @IsString()
    @IsNotEmpty()
    BusAssigned: string;
}
