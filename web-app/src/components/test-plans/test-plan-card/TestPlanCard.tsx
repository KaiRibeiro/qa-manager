import { TestPlan } from '../../../types/TestPlan';
import StatusTag from '../../shared/status-tag/StatusTag';
import { Link } from 'react-router-dom';
import { Priority } from '../../../enums/Priority';

function TestPlanCard({ testPlan }: { testPlan: TestPlan }) {
  const getPriorityStyle = () => {
    if (testPlan.priority === Priority.HIGH) {
      return 'text-red-500';
    } else if (testPlan.priority === Priority.MEDIUM) {
      return 'text-yellow-500';
    } else {
      return 'text-green-500';
    }
  };

  return (
    <>
      <Link to={`/testplans/${testPlan.id}`}>
        <div className="flex flex-col bg-white p-4 rounded-xl shadow-md">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-semibold text-xl">{testPlan.name}</h1>
            <div>
              <StatusTag status={testPlan.status} />
            </div>
          </div>

          <div className="space-y-1 mt-2">
            <p>{testPlan.description}</p>
            <div>
              Priority: <span className={`${getPriorityStyle()}`}>{testPlan.priority}</span>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center space-x-2 text-sm text-gray-700 mt-4">
            <div>
              Created by <span className="font-bold">{testPlan.owner_id}</span>
            </div>
            <span>|</span>
            <div>Last updated: {new Date(testPlan.last_updated).toLocaleDateString()}</div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default TestPlanCard;
