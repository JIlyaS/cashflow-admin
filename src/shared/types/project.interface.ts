import { Estimate } from './estimate.interface';

export interface Project {
  id?: string;
  title: string;
  status: string;
  estimates: Estimate[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
