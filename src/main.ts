import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {
  MicroserviceExceptionFilter,
  MicroserviceValidationPipe,
  PrismaRepository,
} from './common';

const bootstrap = async () => {
  const logger = new Logger('Bootstrap');
  const port = 3000;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port,
      },
    },
  );

  const prismaRepository: PrismaRepository = app.get(PrismaRepository);
  prismaRepository.enableShutdownHooks(app);

  app.useGlobalPipes(new MicroserviceValidationPipe());
  app.useGlobalFilters(new MicroserviceExceptionFilter());

  await app.listen();
  logger.log(`Microservice started on port: ${port}`);
};

bootstrap();
