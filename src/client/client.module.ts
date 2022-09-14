import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Module({
  controllers: [ClientController],
  providers: [ClientService, AxiosAdapter]
})
export class ClientModule {}
