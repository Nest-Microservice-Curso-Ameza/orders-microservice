// NATIVE 
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';


// INSTALLED 
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// CUSTOM 
import { envs } from './config';
import { ExceptionFilter } from './common/exceptions/rpc-exception.filter';


async function bootstrap() {

  const logger = new Logger('orders-ms');

  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port
      }
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }),
  );


  app.useGlobalFilters(
    new ExceptionFilter()
  )

  await app.listen();
  // console.log(`App running in port ${env.port}`)
  logger.log(`Orders microservice running in port ${envs.port}`)
}
bootstrap();
