export interface Project {
  projectId?: number;
  title: string;
  created?: Date;
  description: string;
  status: boolean;
  userId: number;
  finishDate: Date;
  tasks: any;
}
