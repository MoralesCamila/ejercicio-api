import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RawHeaders } from 'src/Auth/decorators/raw-header.decorator';
import { CreditService } from './credit.service';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';

@Controller('loans')
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Post()
  create(
    @Body() createCreditDto: CreateCreditDto,
    @RawHeaders() rawHeaders: string[],
    ) {
    return this.creditService.create(createCreditDto, rawHeaders);
  }

  @Get()
  findAll() {
    return this.creditService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditService.findOne(+id);
  }
}
