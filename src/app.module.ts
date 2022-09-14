import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { CommonModule } from './common/common.module';
import { ProductModule } from './product/product.module';
import { CreditModule } from './credit/credit.module';

@Module({
  imports: [
    ClientModule,
    CommonModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    CreditModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
