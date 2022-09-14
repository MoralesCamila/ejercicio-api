import { PaginationDto } from '../dto/pagination.dto';
import { CreateClientDto } from '../../client/dto/create-client.dto';
import { HeaderDto } from '../dto/header.dto';
import { ParamsDto } from 'src/product/dto/params.dto';
import { CreateCreditDto } from '../../credit/dto/create-credit.dto';
import { ApproveCreditDto } from '../../credit/dto/approve-credit.dto';

export interface HttpAdapter {

    get<T>(url: string, apikey: string, paginationDto: PaginationDto): Promise<T>;

    post<T>(url: string, apikey: string, idEmpotencyKey: string, createClientDto: CreateClientDto): Promise<T>;

    getProduct<T>(url: string, id: string, headers: HeaderDto, params: ParamsDto): Promise<T>;

    postCredit<T>(url: string, headers: HeaderDto, createCreditDto: CreateCreditDto): Promise<T>;

    postApproveCredit<T>(url: string, id: string, headers: HeaderDto, approveCreditDto: ApproveCreditDto): Promise<T>;

    getStatusCreditById<T>(url: string, id: string, headers: HeaderDto): Promise<T>;
}