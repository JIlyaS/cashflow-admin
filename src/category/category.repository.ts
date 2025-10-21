import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryEntity } from './entities/category.entity';
import { PrismaClientService } from 'src/shared/models';
// import { PrismaClientService } from '@project/shared/blog/models';
import { MAX_CATEGORY_LIMIT } from './category.constant';
import {
  CategoryFilter,
  categoryFilterToPrismaFilter,
} from './category.filter';
import { BasePostgresRepository } from 'src/libs/repository';
import { Category } from 'src/shared/types';

@Injectable()
export class CategoryRepository extends BasePostgresRepository<
  CategoryEntity,
  Category
> {
  constructor(protected readonly client: PrismaClientService) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    super(client, CategoryEntity.fromObject);
  }

  public async save(entity: CategoryEntity): Promise<CategoryEntity> {
    const record = await this.client.category.create({
      data: { ...entity.toPOJO() },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<CategoryEntity | null> {
    const document = await this.client.category.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(
    filter?: CategoryFilter,
  ): Promise<(CategoryEntity | null)[]> {
    const where = filter ?? categoryFilterToPrismaFilter(filter);

    const documents = await this.client.category.findMany({
      where,
      take: MAX_CATEGORY_LIMIT,
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.category.delete({
      where: {
        id,
      },
    });
  }

  public async update(
    id: string | undefined,
    entity: CategoryEntity,
  ): Promise<CategoryEntity | null> {
    const updatedCategory = await this.client.category.update({
      where: { id },
      data: {
        title: entity.title,
      },
    });

    return this.createEntityFromDocument(updatedCategory);
  }
}
