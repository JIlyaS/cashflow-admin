import { Category, Estimate, Project } from 'src/shared/types';

export class EstimateEntity {
  id?: string;
  title: string;
  sum: number;
  category: Category;
  project: Project;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Estimate) {
    if (!data.title || !data.sum) {
      throw new Error('Estimate title and sum is required');
    }
    this.populate(data);
  }

  public populate(data: Estimate): void {
    this.id = data.id ?? undefined;
    this.title = data.title;
    this.sum = data.sum;
    this.category = data.category ?? undefined;
    this.project = data.project ?? undefined;
    this.userId = data.userId;
    this.updatedAt = data.updatedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
  }

  public toPOJO(): Estimate {
    return {
      id: this.id,
      title: this.title,
      sum: this.sum,
      category: this.category,
      project: this.project,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: Estimate): EstimateEntity {
    return new EstimateEntity(data);
  }
}
