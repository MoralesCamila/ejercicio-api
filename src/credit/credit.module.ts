import { Module } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Module({
  controllers: [CreditController],
  providers: [CreditService, AxiosAdapter]
})
export class CreditModule {}
