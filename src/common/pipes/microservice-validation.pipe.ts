import {
  BadRequestException,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

export class MicroserviceValidationPipe extends ValidationPipe {
  constructor(options: ValidationPipeOptions = {}) {
    super({
      whitelist: true,
      exceptionFactory: (errors) =>
        new BadRequestException(
          errors.map((error) => ({
            msgs: Object.values(error.constraints),
            field: error.property,
          })),
        ),
      ...options,
    });
  }
}
