import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Email must be 50 characters or less'),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(100, 'Email must be 100 characters or less')
    .email('Invalid email format'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});
