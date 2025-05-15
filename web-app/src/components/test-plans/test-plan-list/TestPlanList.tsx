import TestPlanCard from '../test-plan-card/TestPlanCard';
import { useEffect, useMemo, useState } from 'react';
import PlansService from '../../../services/PlansService';
import { TestPlan } from '../../../types/TestPlan';
import NoResultsMessage from '../../shared/no-results-message/NoResultsMessage';
import ErrorMessage from '../../shared/error-message/ErrorMessage';

function TestPlanList({ refresh }: { refresh: boolean }) {
  const plansService = useMemo(() => new PlansService(), []);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [plans, setPlans] = useState<TestPlan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const response = await plansService.get_plans();
        const sortedPlans = response.data.sort(
          (a: TestPlan, b: TestPlan) =>
            new Date(b.created_date).getTime() - new Date(a.created_date).getTime(),
        );
        setPlans(sortedPlans);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans().catch(console.error);
  }, [refresh]);

  //TODO: Add better loading component
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-10 px-8">
        {isLoading && 'Loading...'}
        {hasError && (
          <div className="col-span-full flex justify-center items-center h-full">
            <ErrorMessage />
          </div>
        )}

        {!isLoading && !hasError && plans.length === 0 && (
          <div className="col-span-full flex justify-center items-center">
            <NoResultsMessage />
          </div>
        )}

        {!isLoading &&
          !hasError &&
          plans.length > 0 &&
          plans.map((plan: TestPlan) => <TestPlanCard key={plan.id} testPlan={plan} />)}
      </div>
    </>
  );
}

export default TestPlanList;
