import { useForm } from 'react-hook-form';
import { testPlanSchema } from '../../../schemas/TestPlanSchema';
import { TestPlan } from '../../../types/TestPlan';
import { zodResolver } from '@hookform/resolvers/zod';
import { Priority } from '../../../enums/Priority';
import { useEffect, useMemo } from 'react';
import { PlanStatus } from '../../../enums/PlanStatus';
import PlansService from '../../../services/PlansService';
import { LiaRedoAltSolid, LiaSave } from 'react-icons/lia';
import { z } from 'zod';

function TestPlanForm({
  testPlan,
  onCancel,
  onSaveSuccess,
}: {
  testPlan?: TestPlan;
  onCancel: () => void;
  onSaveSuccess: () => void;
}) {
  type FormData = z.infer<typeof testPlanSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(testPlanSchema),
    mode: 'onChange',
    defaultValues: {
      name: testPlan?.name || '',
      description: testPlan?.description || '',
      priority: testPlan?.priority || Priority.LOW,
      status: testPlan?.status || PlanStatus.DRAFT,
    },
  });

  const plansService = useMemo(() => new PlansService(), []);

  const onSubmit = async (data: FormData) => {
    try {
      await plansService.create_plan(data);
      onSaveSuccess();
      onCancel();
    } catch (error) {
      console.error('Error creating plan:', error);
      alert('Failed to create plan.');
    }
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-4">
      <h2 className="text-xl font-bold text-center">Create New Test Plan</h2>

      <div className="space-y-3">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name *
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter test plan name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <p id="name-error" className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="Enter test plan description"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'description-error' : undefined}
          {...register('description')}
        />
        {errors.description && (
          <p id="description-error" className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority *
          </label>
          <select
            id="priority"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register('priority')}
          >
            {Object.values(Priority).map((p) => (
              <option key={p} value={p}>
                {p.charAt(0) + p.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status *
          </label>
          <select
            id="status"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register('status')}
          >
            {Object.values(PlanStatus).map((s) => (
              <option key={s} value={s}>
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`flex items-center justify-center gap-2 w-32 h-11 rounded-md text-sm font-medium border transition
        ${
          isValid && !isSubmitting
            ? 'bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-500 hover:cursor-pointer'
            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
        }`}
        >
          <LiaSave size={20} />
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>

        <button
          onClick={handleCancel}
          type="button"
          className="flex items-center justify-center gap-2 w-32 h-11 rounded-md text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:cursor-pointer hover:bg-gray-100 transition"
        >
          <LiaRedoAltSolid size={20} />
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TestPlanForm;
