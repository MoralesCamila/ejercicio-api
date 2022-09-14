import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  Query
} from '@nestjs/common';
import { RawHeaders } from 'src/Auth/decorators/raw-header.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post()
  create(
    @RawHeaders() rawHeaders: string[],
    @Body() createClientDto: CreateClientDto
  ) {
    return this.clientService.create(createClientDto, rawHeaders);
  }


  @Get()
  findAll(
    @RawHeaders() rawHeaders: string[],
    @Query() paginationDto: PaginationDto) {

    const posicion = rawHeaders.indexOf('apikey') + 1;

    if (posicion == 0) {
      throw new UnauthorizedException('No puede ingresar, falta el apikey')
    }

    const apikey = rawHeaders[posicion];

    return this.clientService.findAll(apikey, paginationDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.clientService.findOne(+id);
  // }

}
