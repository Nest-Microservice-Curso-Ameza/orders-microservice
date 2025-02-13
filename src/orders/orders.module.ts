import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE, PRODUCTS_SERVICE } from 'src/config/services';
import { envs } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    NatsModule
    // ClientsModule.register([
    //   { 
    //     name: NATS_SERVICE, 
    //     transport: Transport.NATS,
    //     options: {
    //       servers: envs.natsServers,
    //       // host: envs.hostMicroservice,
    //       // port: envs.portMicroservice
    //     },
    //   },
    // ]),
  ]
})
export class OrdersModule {}
