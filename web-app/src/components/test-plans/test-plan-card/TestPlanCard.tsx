import { TestPlan } from '../../../types/TestPlan';
import StatusTag from '../../shared/status-tag/StatusTag';
import { Link } from 'react-router-dom';
import { Priority } from '../../../enums/Priority';
import { AiOutlineArrowUp } from 'react-icons/ai';

function TestPlanCard({ testPlan }: { testPlan: TestPlan }) {
  return (
    <>
      <Link to={`/testplans/${testPlan.id}`}>
        <div className="flex flex-col justify-between bg-white p-4 rounded-xl shadow-md min-h-70">
          <div className="flex flex-row justify-between items-center space-x-4">
            <div className="flex flex-row justify-between gap-4">
              <div className="flex items-center gap-2">
                {testPlan?.priority === 'HIGH' && (
                  <div className="text-red-500 flex flex-row gap-2" title="High Priority">
                    <AiOutlineArrowUp size={24} />
                  </div>
                )}
                {testPlan?.priority === 'MEDIUM' && (
                  <div className="text-yellow-500 flex flex-row gap-2" title="Medium Priority">
                    <AiOutlineArrowUp size={24} />
                  </div>
                )}
                {testPlan?.priority === 'LOW' && (
                  <div className="text-green-500 flex flex-row gap-2" title="Low Priority">
                    <AiOutlineArrowUp size={24} />
                  </div>
                )}
              </div>
              <h1 className="font-semibold text-xl">{testPlan.name}</h1>
            </div>
          </div>
          <div>
            <StatusTag status={testPlan.status} />
          </div>
          <div className="space-y-4 mt-2">
            <p>{testPlan.description}</p>
          </div>

          <div className="flex flex-row justify-between items-center space-x-2 text-sm text-gray-700 mt-4 border-t pt-4">
            <div>
              Created at{' '}
              <span className="font-bold">
                {new Date(testPlan.created_date).toLocaleDateString()}
              </span>
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
