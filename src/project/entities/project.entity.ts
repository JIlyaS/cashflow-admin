import { Estimate, Project } from 'src/shared/types';

export class ProjectEntity {
  id?: string;
  title: string;
  status: string;
  estimates: Estimate[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: Project) {
    if (!data.title || !data.status) {
      throw new Error('Project title and status is required');
    }
    this.populate(data);
  }

  public populate(data: Project): void {
    this.id = data.id ?? undefined;
    this.title = data.title;
    this.status = data.status;
    this.estimates = data.estimates ?? [];
    this.userId = data.userId;
    this.updatedAt = data.updatedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
  }

  public toPOJO(): Project {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      estimates: this.estimates,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: Project): ProjectEntity {
    return new ProjectEntity(data);
  }
}
