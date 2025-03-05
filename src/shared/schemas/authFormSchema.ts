import { z } from 'zod';

import { _emailSchema } from './emailSchema';
import { _passwordSchema } from './passwordSchema';

const authFormSchema = z.object({
  email: _emailSchema,
  password: _passwordSchema,
});

type AuthForm = z.infer<typeof authFormSchema>;

const defaultValues: AuthForm = {
  email: '',
  password: '',
};

export { type AuthForm, authFormSchema, defaultValues };
