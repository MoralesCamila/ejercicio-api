import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ParamsDto } from './dto/params.dto';
import { HeaderDto } from '../common/dto/header.dto';


@Injectable()
export class ProductService {

  private url: string = this.configService.get('urlProduct');
  private headers: HeaderDto = {
    apikey: '',
    Accept: ''
  };

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
  ) { }

  async findOne(id: string, rawHeaders: string[], params: ParamsDto) {

    const posicion = rawHeaders.indexOf('apikey') + 1;
    const posicion2 = rawHeaders.indexOf('Accept') + 1;

    if (posicion == 0) {
      throw new UnauthorizedException('No puede ingresar, falta el apikey')
    }

    let accept: string = "";
    
    //existe y es diferente de */*
    if (posicion2 != 0 && rawHeaders[posicion2] != '*/*') {
      accept = rawHeaders[posicion2];
    }

    const apikey = rawHeaders[posicion];

    this.headers.Accept = accept;
    this.headers.apikey = apikey;

    const data = await this.http.getProduct<any>(this.url, id, this.headers, params)

    return data;
  }

}
