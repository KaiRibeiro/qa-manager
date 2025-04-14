import {TestPlan} from "../../../types/TestPlan";
import StatusTag from "../../shared/status-tag/StatusTag";
import {Link} from "react-router-dom";

function TestPlanCard({testPlan}: { testPlan: TestPlan }) {
    return (
        <>
            <Link to={`/testplans/${testPlan.id}`}>
                <div className="flex flex-col bg-white p-4 rounded-xl shadow-md min-w-72 max-w-100 min-h-32 text-center justify-center space-y-5">
                    <div className="flex flex-row justify-around items-center space-x-4 w-fit">
                        <h1 className="font-semibold text-3xl">{testPlan.name}</h1>
                        <div>
                            <StatusTag status={testPlan.status} />
                        </div>
                    </div>

                    <div className="flex -mt-2 w-fit">
                        <p>
                            {testPlan.description}
                        </p>
                    </div>

                    <div className="flex flex-row space-x-2 text-sm text-gray-700 mt-4 w-fit">
                        <div>
                            Created by <span className="font-bold">{testPlan.owner_id}</span>
                        </div>
                        <span>|</span>
                        <div>
                            Last updated: {new Date(testPlan.last_updated).toLocaleDateString()}
                        </div>
                    </div>

                </div>
            </Link>
        </>
    );
}

export default TestPlanCard;