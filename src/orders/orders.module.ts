import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from 'src/config/services';
import { envs } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ClientsModule.register([
      { 
        name: PRODUCTS_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.hostMicroservice,
          port: envs.portMicroservice
        },
      },
    ]),
  ]
})
export class OrdersModule {}
