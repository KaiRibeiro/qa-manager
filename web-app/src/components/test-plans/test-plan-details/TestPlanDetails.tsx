import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import StatusTag from '../../shared/status-tag/StatusTag';
import ActionButtons from '../../shared/action-buttons/ActionButtons';
import TestPlanForm from '../test-plan-form/TestPlanForm';
import TestCasesTable from '../../shared/test-cases-table/TestCasesTable';
import { TestPlan } from '../../../types/TestPlan';
import PlansService from '../../../services/PlansService';
import { AiOutlineArrowUp } from 'react-icons/ai';
import CreateButton from '../../shared/create-button/CreateButton';
import ErrorMessage from '../../shared/error-message/ErrorMessage';

function TestPlanDetails() {
  const plansService = useMemo(() => new PlansService(), []);
  const [editing, setEditing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [testPlan, setTestPlan] = useState<TestPlan>();
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const response = await plansService.get_plan_by_id(Number(id));
        setTestPlan(response.data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans().catch(console.error);
  }, [refresh]);

  const formatDate = (dateStr?: Date | string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 flex justify-center px-4 py-8">
      {isLoading ? (
        <div className="text-center text-gray-500">Loading test plan...</div>
      ) : hasError ? (
        <ErrorMessage />
      ) : (
        <>
          <div className="w-screen mt-10 bg-white shadow-lg rounded-2xl p-8">
            {editing ? (
              <TestPlanForm onCancel={() => setEditing(false)} testPlan={testPlan} onValidityChange={setIsFormValid} />
            ) : (
              <>
                <div className="mb-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{testPlan?.name}</h1>
                    <div>
                      <div className="flex items-center gap-2">
                        {testPlan?.priority === 'HIGH' && (
                          <div className="text-red-500 flex flex-row gap-2" title="High Priority">
                            <AiOutlineArrowUp size={24} />
                            High Priority
                          </div>
                        )}
                        {testPlan?.priority === 'MEDIUM' && (
                          <div
                            className="text-yellow-500 flex flex-row gap-2"
                            title="Medium Priority"
                          >
                            <AiOutlineArrowUp size={24} />
                            Medium Priority
                          </div>
                        )}
                        {testPlan?.priority === 'LOW' && (
                          <div className="text-green-500 flex flex-row gap-2" title="Low Priority">
                            <AiOutlineArrowUp size={24} />
                            Low Priority
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 text-lg">{testPlan?.description}</p>
                <div className="flex justify-between text-sm text-gray-800 mt-4">
                  <div>
                    <span className="font-medium">Status:</span> {testPlan?.status}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>{' '}
                    {formatDate(testPlan?.created_date)}
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span>{' '}
                    {formatDate(testPlan?.last_updated)}
                  </div>
                </div>
                <StatusTag status={testPlan?.status} />
              </>
            )}

            <div className="flex justify-end gap-4 mt-4">
              {!editing && ((
                <ActionButtons
                  isEditing={editing}
                  onClick={() => setEditing(!editing)}
                  isFormValid={isFormValid}
                />
              ))}

            </div>

            <section className="mt-12">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-semibold">Test Cases</h2>
              </div>
              <div className="mt-8">
                <CreateButton onClick={() => console.log("added")} defaultText="Test Case" />
                <TestCasesTable />
              </div>
            </section>
          </div>
        </>
      )}
    </main>
  );
}

export default TestPlanDetails;
