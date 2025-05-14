import TestPlanForm from '../test-plan-form/TestPlanForm';

function TestPlanDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative z-20 w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 ">
        <TestPlanForm onCancel={onClose} />
      </div>
    </div>
  );
}
export default TestPlanDialog;
