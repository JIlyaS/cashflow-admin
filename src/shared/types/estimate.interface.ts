import { Category } from './category.interface';
import { Project } from './project.interface';

export interface Estimate {
  id?: string;
  title: string;
  sum: number;
  category: Category;
  project: Project;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
