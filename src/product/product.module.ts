import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { HeaderDto } from '../common/dto/header.dto';

@Module({
  controllers: [ProductController],
  providers: [ProductService, AxiosAdapter],
})
export class ProductModule {}
