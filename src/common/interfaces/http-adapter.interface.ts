import { PaginationDto } from '../dto/pagination.dto';
import { CreateClientDto } from '../../client/dto/create-client.dto';

export interface HttpAdapter {
    
    get<T>(url: string, apikey: string, paginationDto:PaginationDto): Promise<T>;

    post<T>(url: string, apikey: string, idEmpotencyKey: string, createClientDto: CreateClientDto): Promise<T>;

    
}