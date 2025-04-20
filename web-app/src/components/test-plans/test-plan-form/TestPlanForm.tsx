import { TestPlan } from '../../../types/TestPlan';
import { z } from 'zod';
import { testPlanSchema } from '../../../schemas/TestPlanSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanStatus } from '../../../enums/PlanStatus';
import { useEffect } from 'react';

function TestPlanForm({
  testPlan,
  onValidityChange,
}: {
  testPlan: TestPlan;
  onValidityChange: (isValid: boolean) => void;
}) {
  type FormData = z.infer<typeof testPlanSchema>;

  const {
    register,
    formState: { isValid },
  } = useForm<FormData>({
    resolver: zodResolver(testPlanSchema),
    mode: 'onChange',
    defaultValues: {
      name: testPlan.name,
      description: testPlan.description,
      status: testPlan.status,
    },
  });

  useEffect(() => {
    onValidityChange?.(isValid);
  }, [isValid, onValidityChange]);

  return (
    <>
      <form className="flex flex-col gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <label className="text-lg font-semibold">Name *</label>
          <input
            maxLength={60}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register('name')}
          />
          <label className="text-lg font-semibold">Description *</label>
          <textarea
            maxLength={100}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register('description')}
          />
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register('status')}
          >
            <option value={PlanStatus.IN_PROGRESS}>In Progress</option>
            <option value={PlanStatus.DRAFT}>Draft</option>
            <option value={PlanStatus.COMPLETE}>Complete</option>
          </select>
        </div>
      </form>
    </>
  );
}

export default TestPlanForm;
