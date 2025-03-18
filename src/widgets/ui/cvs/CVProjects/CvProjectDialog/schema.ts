import * as z from 'zod';

export const schema = z
  .object({
    id: z.string().min(1, 'Project is required'),
    domain: z.string(),
    start_date: z
      .string()
      .min(1, 'Start date is required')
      .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Invalid date format',
      })
      .refine(
        (value) => {
          const year = new Date(value).getFullYear();
          return year >= 2000 && year <= 2100;
        },
        { message: 'Year must be between 2000-2100' },
      ),
    end_date: z
      .string()
      .optional()
      .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Invalid date format',
      })
      .refine(
        (value) => {
          if (!value) return true;
          const year = new Date(value).getFullYear();
          return year >= 2000 && year <= 2100;
        },
        { message: 'Year must be between 2000-2100' },
      ),
    description: z.string(),
    responsibilities: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.end_date && new Date(data.end_date) < new Date(data.start_date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['end_date'],
        message: 'End date cannot be earlier than start date',
      });
    }
  });
