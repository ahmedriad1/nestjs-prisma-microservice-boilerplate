import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaRepository } from './prisma.repository';

const prismaRepositories = new Set<PrismaDelegateNames>();

export function createRepositoryProviers() {
  return [...prismaRepositories].map((name: string) => {
    return {
      provide: `${name}PrismaRepository`,
      inject: [PrismaRepository],
      useFactory: (prisma: PrismaRepository) => prisma[name],
    };
  });
}

/**
 * Example:
 * @InjectRepository('user') repository: PrismaRepository['user'] or PrismaClient['user']
 */
export function InjectRepository(name: PrismaDelegateNames) {
  prismaRepositories.add(name);
  return Inject(`${name as string}PrismaRepository`);
}

export type PrismaDelegateNames = keyof {
  [P in keyof PrismaClient as PrismaClient[P] extends any
    ? P
    : never]: PrismaClient[P];
};
