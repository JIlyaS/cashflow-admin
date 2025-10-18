import { Estimate } from './estimate.interface';

export interface Category {
  id?: string;
  title: string;
  estimates: Estimate[];
  createdAt?: Date;
  updatedAt?: Date;
}
