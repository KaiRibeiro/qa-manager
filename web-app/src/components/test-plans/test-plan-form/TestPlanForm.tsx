import { TestPlan } from '../../../types/TestPlan';
import { z } from 'zod';
import { testPlanSchema } from '../../../schemas/TestPlanSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanStatus } from '../../../enums/PlanStatus';
import { useEffect, useState } from 'react';
import { Priority } from '../../../enums/Priority';
import { LiaRedoAltSolid, LiaSave } from 'react-icons/lia';
import PlansService from '../../../services/PlansService';

function TestPlanForm({ testPlan, onCancel }: { testPlan?: TestPlan; onCancel: () => void }) {
  type FormData = z.infer<typeof testPlanSchema>;

  const {
    register,
    handleSubmit,
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

  const [isFormValid, setIsFormValid] = useState(false);
  const plansService = new PlansService();

  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid]);

  const onSubmit = async (data: FormData) => {
    try {
      await plansService.create_plan(data);
      onCancel();
    } catch (error) {
      console.error('Error creating plan:', error);
      alert('Failed to create plan.');
    }
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
          {...register('name')}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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
          {...register('description')}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
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
            <option value={Priority.LOW}>Low</option>
            <option value={Priority.MEDIUM}>Medium</option>
            <option value={Priority.HIGH}>High</option>
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
            <option value={PlanStatus.IN_PROGRESS}>In Progress</option>
            <option value={PlanStatus.DRAFT}>Draft</option>
            <option value={PlanStatus.COMPLETE}>Complete</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`flex items-center justify-center gap-2 w-32 h-11 rounded-md text-sm font-medium border transition
        ${
          isFormValid
            ? 'bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-500 hover:cursor-pointer'
            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
        }`}
        >
          <LiaSave size={20} />
          Save
        </button>

        <button
          onClick={onCancel}
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
