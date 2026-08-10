export interface WorkItem {
  id: number;

  title: string;

  completed: boolean;

  userId: number;

  isLocal?: boolean;
}