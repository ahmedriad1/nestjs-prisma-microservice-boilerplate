import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    PrismaModule.register({ logQueries: false }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
