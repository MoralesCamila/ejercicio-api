import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUppercase } from "class-validator";
import { Action } from "../enum/action.enum";

export class ApproveCreditDto {

    @IsNotEmpty()
    @IsString()
    @IsEnum(Action)
    @IsUppercase()
    action: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    notes?: string;
}
