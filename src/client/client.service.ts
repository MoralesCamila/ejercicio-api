import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { CreateClientDto } from './dto/create-client.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ClientResponse } from './interfaces/client-response.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientService {

  private url: string = this.configService.get('url');

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService:ConfigService,
  ) { }

  async create(createClientDto: CreateClientDto, rawHeaders: string[]) {

    const posicion = rawHeaders.indexOf('apikey') + 1;

    if (posicion == 0) {
      throw new UnauthorizedException('No puede ingresar, falta el apikey')
    }
    const posicion2 = rawHeaders.indexOf('Idempotency-Key') + 1;

    if (posicion2 == 0) {
      throw new UnauthorizedException('No puede ingresar, falta el id')
    }

    const apikey = rawHeaders[posicion];
    const idEmpotencyKey = rawHeaders[posicion2];

    const data = await this.http.post<any>(this.url, apikey, idEmpotencyKey, createClientDto)

    return data;
  }

  async findAll(apikey: string, paginationDto: PaginationDto) {

    //const { limit = 5, offset = 0, paginationDetails = 'OFF', detailsLevel = 'FULL' } = paginationDto;

    const data = await this.http.get<ClientResponse>(this.url, apikey, paginationDto);

    return data;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} client`;
  // }

}
