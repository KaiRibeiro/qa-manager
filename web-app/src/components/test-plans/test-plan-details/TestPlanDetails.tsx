import { PlanStatus } from '../../../enums/PlanStatus';
import StatusTag from '../../shared/status-tag/StatusTag';
import { useState } from 'react';
import ActionButtons from '../../shared/action-buttons/ActionButtons';
import TestPlanForm from '../test-plan-form/TestPlanForm';
import TestPlanCard from '../test-plan-card/TestPlanCard';
import TestCasesTable from '../../shared/test-cases-table/TestCasesTable';
import { Priority } from '../../../enums/Priority';

function TestPlanDetails() {
  const [editing, setEditing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const testPlan = {
    id: '123abc',
    name: 'Regression Testing',
    description: 'Test description for descriptions purposes.',
    priority: Priority.MEDIUM,
    status: PlanStatus.IN_PROGRESS,
    created_date: new Date(Date.now()),
    last_updated: new Date(Date.now()),
    owner_id: 'Kaique Campos',
  };
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 pt-12 flex justify-center">
        <div className="flex flex-col mt-14 gap-2">
          {editing ? (
            <>
              <TestPlanForm testPlan={testPlan} onValidityChange={setIsFormValid} />
            </>
          ) : (
            <>
              <h1 className="font-semibold text-4xl tracking-wider">{testPlan.name}</h1>
              <h2 className="text-xl">{testPlan.description}</h2>
              <StatusTag status={testPlan.status} />
            </>
          )}
          <div className="flex flex-row justify-around mt-4">
            <ActionButtons
              isEditing={editing}
              onClick={() => setEditing(!editing)}
              isFormValid={isFormValid}
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-10 font-semibold text-3xl">
            <h2>Test Cases</h2>
            <button
              className="rounded-md border border-gray-300 w-full h-14 text-gray-600 bg-white shadow-sm
                                flex flex-row justify-center items-center text-xl gap-2 font-semibold mt-4"
            >
              + Add Test Case
            </button>
          </div>
          <div className="mt-10">
            <TestCasesTable />
          </div>
        </div>
      </main>
    </>
  );
}

export default TestPlanDetails;
