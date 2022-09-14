import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class HeaderDto {

    @IsString()
    @IsNotEmpty()
    apikey: string;
    
    @IsString()
    @IsOptional()
    Accept?: string;

}