import { useState } from 'react';
import CreateButton from '../../components/shared/create-button/CreateButton';
import TestPlanDialog from '../../components/test-plans/test-plan-dialog/TestPlanDialog';
import TestPlanList from '../../components/test-plans/test-plan-list/TestPlanList';

function TestPlans() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
  };
  //TODO: Add search component
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 pt-12">
        <div className="flex flex-col md:flex-row ml-28 mt-14 mb-12 justify-around">
          <h1 className="font-bold text-black text-4xl tracking-wider">Test Plans</h1>
          <h2>SEARCH HERE COMPONENT LATER</h2>
        </div>
        <div className="flex flex-col items-center mt-8 space-y-3">
          <CreateButton onClick={openModal} defaultText="Test Plan" />
        </div>
        <div className="flex justify-center">
          <TestPlanList />
        </div>
        {isModalOpen && <TestPlanDialog onClose={closeModal} />}
      </main>
    </>
  );
}

export default TestPlans;
