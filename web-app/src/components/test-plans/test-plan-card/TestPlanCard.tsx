import {TestPlan} from "../../../types/TestPlan";
import StatusTag from "../../shared/status-tag/StatusTag";

function TestPlanCard({testPlan}: { testPlan: TestPlan }) {
    return (
        <>
            <div className="flex flex-col bg-white p-4 rounded-xl shadow-md min-w-72 min-h-32 text-center justify-center space-y-5">
                <div className="flex flex-row justify-around items-center space-x-12">
                    <h1 className="font-semibold text-3xl">{testPlan.name}</h1>
                    <div>
                        <StatusTag status={testPlan.status} />
                    </div>
                </div>

                <div className="flex -mt-2">
                    <p>
                        {testPlan.description}
                    </p>
                </div>

                <div className="flex flex-row space-x-2 text-sm text-gray-700 mt-4">
                    <div>
                        Created by {testPlan.owner_id}
                    </div>
                    <span>|</span>
                    <div>
                        Last updated: {new Date(testPlan.last_updated).toLocaleDateString()}
                    </div>
                </div>

            </div>
        </>
    );
}

export default TestPlanCard;