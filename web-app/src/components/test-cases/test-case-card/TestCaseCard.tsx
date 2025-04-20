import StatusTag from '../../shared/status-tag/StatusTag';
import { TestCase } from '../../../types/TestCase';
import { Priority } from '../../../enums/Priority';

function TestCaseCard({ testCase }: { testCase: TestCase }) {
  const getPriorityStyle = () => {
    if (testCase.priority === Priority.HIGH) {
      return 'text-red-500';
    } else if (testCase.priority === Priority.MEDIUM) {
      return 'text-yellow-500';
    } else {
      return 'text-green-500';
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white p-4 rounded-xl shadow-md min-w-72 max-w-100 min-h-32">
        <div className="flex flex-row justify-between items-center">
          <h3 className="font-semibold text-lg">{testCase.code}</h3>
          <div>
            <StatusTag caseStatus={testCase.status} />
          </div>
        </div>

        <div className="space-y-1">
          <div className="mt-2">
            <h1 className="font-semibold text-xl">{testCase.name}</h1>
          </div>

          <div>
            Priority: <span className={`${getPriorityStyle()}`}>{testCase.priority}</span>
          </div>

          <div>
            <p>{testCase.description}</p>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center space-x-2 text-sm text-gray-700 mt-4">
          <div>
            Created by <span className="font-bold">{testCase.owner_id}</span>
          </div>
          <span>|</span>
          <div>Last updated: {new Date(testCase.last_updated).toLocaleDateString()}</div>
        </div>
      </div>
    </>
  );
}

export default TestCaseCard;
