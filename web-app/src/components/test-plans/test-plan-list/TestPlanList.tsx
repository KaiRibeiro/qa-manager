import TestPlanCard from '../test-plan-card/TestPlanCard';
import { useEffect, useState } from 'react';
import PlansService from '../../../services/PlansService';
import { TestPlan } from '../../../types/TestPlan';
import NoResultsMessage from '../../shared/no-results-message/NoResultsMessage';

function TestPlanList() {
  const plansService = new PlansService();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await plansService.get_plans();
        setPlans(response.data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans().catch(console.error);
  }, []);

  //TODO: Add better loading component
  //TODO: Add better error component
  return (
    <>
      <div className="w-fit md:w-full flex flex-col flex-wrap md:flex-row justify-around items-center gap-8 mt-10">
        {isLoading && 'Loading...'}
        {hasError && 'Something went wrong.'}

        {!isLoading && !hasError && plans.length === 0 && <NoResultsMessage />}

        {!isLoading &&
          !hasError &&
          plans.length > 0 &&
          plans.map((plan: TestPlan) => <TestPlanCard key={plan.id} testPlan={plan} />)}
      </div>
    </>
  );
}

export default TestPlanList;
