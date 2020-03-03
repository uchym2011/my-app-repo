export interface Project {
  projectId?: number;
  name: string;
  created?: Date;
  description: string;
  status: boolean;
  userId: number;
  endDate: Date;
}
