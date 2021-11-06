import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { FindOneDto, CreateDto, UpdateDto, DeleteDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('find_all')
  async findAll() {
    return this.appService.all();
  }

  @MessagePattern('find_one')
  async findOne(data: FindOneDto) {
    return this.appService.get(data);
  }

  @MessagePattern('create')
  async create(data: CreateDto) {
    return this.appService.create(data);
  }

  @MessagePattern('update')
  async update(data: UpdateDto) {
    return this.appService.update(data);
  }

  @MessagePattern('delete')
  async delete(data: DeleteDto) {
    return this.appService.delete(data);
  }
}
