import { z } from 'zod';

export const testPlanSchema = z.object({
  name: z.string().min(1, 'Name is required').max(60, 'Name must be 60 characters or less'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(100, 'Description must be 100 characters or less'),
  status: z.string().min(1, 'Status is required'),
});
