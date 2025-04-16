import {PlanStatus} from "../../types/PlanStatus";
import StatusTag from "../../components/shared/status-tag/StatusTag";
import {useState} from "react";
import ActionButtons from "../../components/shared/action-buttons/ActionButtons";
import TestPlanForm from "./TestPlanForm";

function TestPlanDetails() {
    const [editing, setEditing] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)

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
            <main className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 pt-12 flex justify-center">
                <div className="flex flex-col mt-14 gap-2">
                    {editing ? (
                        <>
                            <TestPlanForm testPlan={testPlan} onValidityChange={setIsFormValid}/>
                        </>
                    ) : (
                        <>
                            <h1 className="font-semibold text-4xl tracking-wider">{testPlan.name}</h1>
                            <h2 className="text-xl">{testPlan.description}</h2>
                            <StatusTag status={testPlan.status}/>
                        </>
                    )}
                    <div className="flex flex-row justify-around mt-4">
                        <ActionButtons isEditing={editing} onClick={() => setEditing(!editing)}
                                       isFormValid={isFormValid}/>
                    </div>
                </div>
            </main>
        </>
    );
}

export default TestPlanDetails;