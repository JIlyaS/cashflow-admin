import { Entity } from 'src/libs/repository/entity.interface';
import { Category } from 'src/shared/types';

export class CategoryEntity implements Category, Entity<string, Category> {
  public id?: string;
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Category) {
    if (!data.title) {
      throw new Error('Category title is required');
    }
    this.populate(data);
  }

  public populate(data: Category): void {
    this.id = data.id ?? undefined;
    this.title = data.title;
    this.updatedAt = data.updatedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
  }

  public toPOJO(): Category {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: Category): CategoryEntity {
    return new CategoryEntity(data);
  }
}
