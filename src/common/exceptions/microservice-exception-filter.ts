import {
  ExceptionFilter,
  Catch,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch()
export class MicroserviceExceptionFilter implements ExceptionFilter {
  private logger = new Logger('ExceptionFIlter');

  catch(exception: any) {
    if (exception instanceof HttpException || exception instanceof RpcException)
      return this.handleException(exception);

    let newException;
    if (exception.code === 'P2025') newException = new NotFoundException();

    if (!newException) {
      this.logger.error(exception);
      newException = new InternalServerErrorException();
    }

    return this.handleException(newException);
  }

  private handleException(exception: HttpException | RpcException) {
    if (exception instanceof RpcException)
      return throwError(() => exception.getError());
    return throwError(() => exception.getResponse());
  }
}
