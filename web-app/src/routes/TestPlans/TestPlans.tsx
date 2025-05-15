import { useState } from 'react';
import CreateButton from '../../components/shared/create-button/CreateButton';
import TestPlanDialog from '../../components/test-plans/test-plan-dialog/TestPlanDialog';
import TestPlanList from '../../components/test-plans/test-plan-list/TestPlanList';

function TestPlans() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSaveSuccess = () => {
    setRefresh((prev) => !prev);
    closeModal();
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 pt-12">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-28 mt-14 mb-12">
          <h1 className="font-bold text-black text-3xl md:text-4xl tracking-wider text-center md:text-left">
            Test Plans
          </h1>
          <h2 className="text-center md:text-left mt-4 md:mt-0">SEARCH HERE COMPONENT LATER</h2>
        </div>
        <div className="flex flex-col items-center mt-8 space-y-3">
          <CreateButton onClick={openModal} defaultText="Test Plan" />
        </div>
        <div className="flex justify-center px-4 md:px-0">
          <TestPlanList refresh={refresh} />
        </div>
        {isModalOpen && <TestPlanDialog onClose={closeModal} onSaveSuccess={handleSaveSuccess} />}
      </main>
    </>
  );
}

export default TestPlans;
