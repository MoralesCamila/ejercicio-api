import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RawHeaders } from 'src/Auth/decorators/raw-header.decorator';
import { CreditService } from './credit.service';
import { CreateCreditDto } from './dto/create-credit.dto';
import { ApproveCreditDto } from './dto/approve-credit.dto';

@Controller('loans')
export class CreditController {
  constructor(private readonly creditService: CreditService) { }

  @Post()
  create(
    @Body() createCreditDto: CreateCreditDto,
    @RawHeaders() rawHeaders: string[],
  ) {
    return this.creditService.create(createCreditDto, rawHeaders);
  }

  @Post(':id')
  approveCredit(
    @Param('id') id: string,
    @Body() approveCreditDto: ApproveCreditDto,
    @RawHeaders() rawHeaders: string[],
  ) {
    return this.creditService.approveCredit(approveCreditDto, rawHeaders, id);
  }


  @Get(':id')
  statusCredit(@Param('id') id: string,
    @RawHeaders() rawHeaders: string[]
  ) {
    return this.creditService.statusCreditById(id, rawHeaders);
  }
}
