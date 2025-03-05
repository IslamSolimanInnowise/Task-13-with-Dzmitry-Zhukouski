import { z } from 'zod';

const _passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters' });

const passwordSchema = z.object({
  password: _passwordSchema
});

type Password = z.infer<typeof passwordSchema>;

const defaultValues: Password = {
  password: '',
};

export { _passwordSchema,defaultValues, type Password, passwordSchema };
