import TestPlanCard from "../test-plan-card/TestPlanCard";
import {PlanStatus} from "../../../types/PlanStatus";

function TestPlanList() {
    const testPlan = {
        id: "123abc",
        name: "Regression Testing",
        description: "Test description for descriptions purposes.",
        status: PlanStatus.IN_PROGRESS,
        created_date: new Date(Date.now()),
        last_updated: new Date(Date.now()),
        owner_id: "Kaique Campos"
    }
    return (
        <>
            <div className="w-fit md:w-full flex flex-col flex-wrap md:flex-row justify-between gap-8 m-10">
                <TestPlanCard testPlan={testPlan} />
                <TestPlanCard testPlan={testPlan} />
                <TestPlanCard testPlan={testPlan} />
                <TestPlanCard testPlan={testPlan} />
                <TestPlanCard testPlan={testPlan} />
                <TestPlanCard testPlan={testPlan} />
                <TestPlanCard testPlan={testPlan} />
                <TestPlanCard testPlan={testPlan} />
                <TestPlanCard testPlan={testPlan} />
                <TestPlanCard testPlan={testPlan} />
                <TestPlanCard testPlan={testPlan} />
                <TestPlanCard testPlan={testPlan} />
            </div>
        </>
    );
}

export default TestPlanList;