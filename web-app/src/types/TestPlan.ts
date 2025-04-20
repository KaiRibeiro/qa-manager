import { PlanStatus } from '../enums/PlanStatus';
import { Priority } from '../enums/Priority';

export interface TestPlan {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  status: PlanStatus;
  created_date: Date;
  last_updated: Date;
  owner_id: string;
}
