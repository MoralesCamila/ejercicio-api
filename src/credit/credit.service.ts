import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreateCreditDto } from './dto/create-credit.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { HeaderDto } from 'src/common/dto/header.dto';
import { ApproveCreditDto } from './dto/approve-credit.dto';

@Injectable()
export class CreditService {

  private url: string = this.configService.get('urlCredit');
  private headers: HeaderDto = {
    apikey: '',
    Accept: ''
  };

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
  ) { }

  async create(createCreditDto: CreateCreditDto, rawHeaders: string[]) {

    const posicion = rawHeaders.indexOf('apikey') + 1;
    const posicion2 = rawHeaders.indexOf('Accept') + 1;


    if (posicion == 0) {
      throw new UnauthorizedException('No puede ingresar, falta el apikey')
    }

    if (rawHeaders[posicion2] != this.configService.get('Accept')) {
      throw new UnauthorizedException('MISSING_ENTITY_JSON')
    }
    const accept = rawHeaders[posicion2]
    const apikey = rawHeaders[posicion];

    this.headers.Accept = accept;
    this.headers.apikey = apikey;

    const data = await this.http.postCredit<any>(this.url, this.headers, createCreditDto)

    return data;
  }

  async approveCredit(approveCreditDto: ApproveCreditDto, rawHeaders: string[], id: string) {

    const posicion = rawHeaders.indexOf('apikey') + 1;
    const posicion2 = rawHeaders.indexOf('Accept') + 1;

    if (posicion == 0) {
      throw new UnauthorizedException('No puede ingresar, falta el apikey')
    }

    if (rawHeaders[posicion2] != this.configService.get('Accept')) {
      throw new UnauthorizedException('MISSING_ENTITY_JSON')
    }
    const accept = rawHeaders[posicion2]
    const apikey = rawHeaders[posicion];

    this.headers.Accept = accept;
    this.headers.apikey = apikey;

    const data = await this.http.postApproveCredit<any>(this.url, id, this.headers, approveCreditDto)

    return data;

  }

  async statusCreditById(id: string, rawHeaders: string[],) {

    const posicion = rawHeaders.indexOf('apikey') + 1;
    const posicion2 = rawHeaders.indexOf('Accept') + 1;

    if (posicion == 0) {
      throw new UnauthorizedException('No puede ingresar, falta el apikey')
    }

    let accept = '';
    if (rawHeaders[posicion2] == this.configService.get('Accept')) {
      accept = rawHeaders[posicion2]
    }
    
    const apikey = rawHeaders[posicion];

    this.headers.Accept = accept;
    this.headers.apikey = apikey;

    const data = await this.http.getStatusCreditById<any>(this.url, id, this.headers)

    return data;
  }

}
