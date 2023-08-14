export type Task = {
  id: number;
  name: string;
  summary: string;
  assignee: string;
  startDate: string;
  endDate: string;
  type: string;
  priority: string;
  status: string;
  effortSpent: number;
}

export type Milestone = {
  milestoneName: string;
  milestoneSummary: string;
  assignee: string;
  startDate: string;
  endDate: string;
  priority: string;
  tasks: Task[];
}

export type Sprint = {
  sprintName: string;
  sprintSummary: string;
  startDate: Date;
  endDate: Date;
  milestones: Milestone[];
}

