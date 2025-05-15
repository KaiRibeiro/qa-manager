import { useEffect, useRef, useState } from 'react';
import TestPlanForm from '../test-plan-form/TestPlanForm';

function TestPlanDialog({
  onClose,
  onSaveSuccess,
}: {
  onClose: () => void;
  onSaveSuccess: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // Trigger animation on mount
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="test-plan-dialog-title"
    >
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-200 ${show ? 'opacity-50' : 'opacity-0'}`}
        onClick={handleClose}
      ></div>
      <div
        ref={dialogRef}
        className={`relative z-20 w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 sm:p-8
          transform transition-all duration-200
          ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="test-plan-dialog-title" className="sr-only">
          Test Plan Dialog
        </h2>
        <TestPlanForm onCancel={handleClose} onSaveSuccess={onSaveSuccess} />
      </div>
    </div>
  );
}
export default TestPlanDialog;
