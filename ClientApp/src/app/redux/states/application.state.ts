import { Queue } from '../../models/Queue';

export interface ApplicationState {
  data: Queue[];
  last: Queue;
  next: Queue[];
  getAll: boolean;
}
