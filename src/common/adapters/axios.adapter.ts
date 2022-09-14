import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { PaginationDto } from '../dto/pagination.dto';
import { CreateClientDto } from '../../client/dto/create-client.dto';
import { HeaderDto } from 'src/common/dto/header.dto';
import { ParamsDto } from 'src/product/dto/params.dto';
import { CreateCreditDto } from 'src/credit/dto/create-credit.dto';
import { ApproveCreditDto } from 'src/credit/dto/approve-credit.dto';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
     
    private axios: AxiosInstance = axios;

    async post<T>(url: string, apikey: string, idEmpotencyKey: string, createClientDto:CreateClientDto): Promise<T> {
        try {
            const { data } = await this.axios.post<T>(url, createClientDto, {
                headers: {
                    'apikey': `${apikey}`,
                    'Idempotency-Key': `${idEmpotencyKey}`,
                    'Accept': `application/vnd.mambu.v2+json`,
                },
            
            });
            return data;
        } catch (error) {
            throw new Error(`Error ${error}`);
        }
    }

    async get<T>(url: string, apikey: string, paginationDto: PaginationDto): Promise<T> {

        const { limit = 10, offset = 0, paginationDetails = 'OFF', detailsLevel = 'BASIC' } = paginationDto;

        try {

            const { data } = await this.axios.get<T>(url, {
                headers: {
                    'apikey': `${apikey}`,
                    'Accept': `application/vnd.mambu.v2+json`,
                },
                params: {
                    'offset': `${offset}`,
                    'paginationDetails': `${paginationDetails}`,
                    'detailsLevel': `${detailsLevel}`,
                    'limit': `${limit}`,
                }

            })
            return data;
        } catch (error) {
            throw new Error(`Error ${error}`);
        }
    }

    async getProduct<T>(url: string, id: string, headers: HeaderDto, params: ParamsDto): Promise<T> {
    
        try {
           // console.log(`${url}/${id}`)
            const { data } = await this.axios.get<T>(`${url}/${id}`, {
                headers: {
                    'apikey': `${headers.apikey}`,
                    'Accept': `${headers.Accept}`,
                },
                params: {
                    'offset': `${params.offset}`,
                    'paginationDetails': `${params.paginationDetails}`,
                    'detailsLevel': `${params.detailsLevel}`,
                    'limit': `${params.limit}`,
                    'sortBy': `${params.sortBy}`,
                }

            })
            return data;
        } catch (error) {
            throw new Error(`Error ${error}`);
        }
    }

    async postCredit<T>(url: string, headers: HeaderDto, createCreditDto: CreateCreditDto): Promise<T> {
        try {
            const { data } = await this.axios.post<T>(url, createCreditDto, {
                headers: {
                    'apikey': `${headers.apikey}`,
                    'Accept': `${headers.Accept}`,
                },
            
            });
            return data;
        } catch (error) {
            throw new Error(`Error ${error}`);
        }
    }

    async postApproveCredit<T>(url: string, id: string, headers: HeaderDto, approveCreditDto: ApproveCreditDto): Promise<T> {
        try {
            
            //console.log(`${url}/${id}:changeState`)

            const { data } = await this.axios.post<T>(`${url}/${id}:changeState`, approveCreditDto, {
                headers: {
                    'apikey': `${headers.apikey}`,
                    'Accept': `${headers.Accept}`,
                },
            })
            return data;
        } catch (error) {
            throw new Error(`Error ${error}`);
        }
    }

    async getStatusCreditById<T>(url: string, id: string, headers: HeaderDto): Promise<T> {
        try {
             const { data } = await this.axios.get<T>(`${url}/${id}`, {
                 headers: {
                     'apikey': `${headers.apikey}`,
                     'Accept': `${headers.Accept}`,
                 },
             })
             return data;
         } catch (error) {
             throw new Error(`Error ${error}`);
         }
    }
   

}