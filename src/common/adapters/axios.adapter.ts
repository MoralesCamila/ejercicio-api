import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { PaginationDto } from '../dto/pagination.dto';
import { CreateClientDto } from '../../client/dto/create-client.dto';

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

}