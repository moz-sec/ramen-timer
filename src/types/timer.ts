export interface Timer {
  id: string;
  name: string;
  deadline: number;
  totalSeconds: number;
  isRunning: boolean;
  isCompleted: boolean;
  remainingMs?: number;
}
