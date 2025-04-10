import {PlanStatus} from "./PlanStatus";

export interface TestPlan {
    name: string;
    description: string;
    status: PlanStatus;
    created_date: Date;
    last_updated: Date;
    owner_id: string;
}