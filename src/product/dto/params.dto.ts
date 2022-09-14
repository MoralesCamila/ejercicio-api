import { IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class ParamsDto {

    @IsOptional()
    @IsNumber()
    @Min(0)
    offset?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsString()
    paginationDetails?: string;

    @IsOptional()
    @IsString()
    detailsLevel?: string;

    @IsOptional()
    @IsString()
    sortBy?: string;

}