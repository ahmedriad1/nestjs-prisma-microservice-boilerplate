import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, PrismaRepository } from './common';
import { FindOneDto, CreateDto, UpdateDto, DeleteDto } from './dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository('post')
    private readonly postRepo: PrismaRepository['post'],
  ) {}

  async all() {
    return this.postRepo.findMany();
  }

  async get(data: FindOneDto) {
    const post = await this.postRepo.findUnique({ where: { id: data.id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async create(data: CreateDto) {
    return this.postRepo.create({ data });
  }

  async update(data: UpdateDto) {
    return this.postRepo.update({ where: { id: data.id }, data });
  }

  async delete(data: DeleteDto) {
    return this.postRepo.delete({ where: { id: data.id } });
  }
}
