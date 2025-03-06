import { z } from 'zod';

const passwordFieldSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters' });

const passwordSchema = z.object({
  password: passwordFieldSchema,
});

type Password = z.infer<typeof passwordSchema>;

const defaultValues: Password = {
  password: '',
};

export { defaultValues, type Password, passwordFieldSchema, passwordSchema };
