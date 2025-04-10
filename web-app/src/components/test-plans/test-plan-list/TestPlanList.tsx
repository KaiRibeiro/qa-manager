import TestPlanCard from "../test-plan-card/TestPlanCard";
import {PlanStatus} from "../../../types/PlanStatus";

function TestPlanList() {
    const testPlan = {
        name: "Regression Testing",
        description: "Test description for descriptions purposes.",
        status: PlanStatus.IN_PROGRESS,
        created_date: new Date(Date.now()),
        last_updated: new Date(Date.now()),
        owner_id: "Kaique Campos"
    }
    return (
        <>
            <div className="w-7/8 flex flex-col flex-wrap md:flex-row justify-between gap-4">
                <TestPlanCard testPlan={testPlan} />
            </div>
        </>
    );
}

export default TestPlanList;