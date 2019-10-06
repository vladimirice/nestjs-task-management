export interface Task {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN        = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE        = 'DONE',
}
