import {CaseStatus} from "../enums/CaseStatus";
import {Priority} from "../enums/Priority";

export interface TestCase {
    id: string;
    code: string;
    name: string;
    description: string;
    status: CaseStatus;
    priority: Priority;
    expected_result: string;
    actual_result?: string;
    created_date: Date;
    last_updated: Date;
    owner_id: string;
}
