import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ParamsDto } from './dto/params.dto';
import { RawHeaders } from 'src/Auth/decorators/raw-header.decorator';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

 
  @Get(':id')
  findOne(
    @Param('id') id: string, 
    @RawHeaders() rawHeaders: string[],
    @Query() params: ParamsDto) {
    return this.productService.findOne(id, rawHeaders, params);
  }

}
