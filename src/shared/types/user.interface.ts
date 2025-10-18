import { Role } from './enums';

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  middleName: string;
  hash: string;
  email: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
