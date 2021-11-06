import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  INestMicroservice,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createPrismaQueryEventHandler } from 'prisma-query-log';
import { PRISMA_OPTIONS, PrismaModuleOptions } from './prisma.providers';

@Injectable()
export class PrismaRepository extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger();

  constructor(@Inject(PRISMA_OPTIONS) options: PrismaModuleOptions) {
    super({
      errorFormat: 'minimal',
      log: options.logQueries
        ? [
            {
              level: 'query',
              emit: 'event',
            },
          ]
        : undefined,
    });

    if (options.logQueries) {
      this.$on(
        'query' as any,
        createPrismaQueryEventHandler({
          logger: (query) => {
            this.logger.verbose(query, 'PrismaClient');
          },
          format: false,
          colorQuery: '\u001B[96m',
          colorParameter: '\u001B[90m',
        }),
      );
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestMicroservice) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
