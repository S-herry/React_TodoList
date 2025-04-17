import { RequestProps } from "./Request";
import { StatusFace } from "./Status";

export interface TaskFace {
  id: number;
  content: string;
  completed: string;
  createdAt: string;
}

export interface TaskProps {
  content: string;
  onTaskRequest: (request: RequestProps) => void;
  onStatusRequest: (request: RequestProps) => void;
  statuses: StatusFace[];
  status: string;
  color: string;
  id: number;
}
