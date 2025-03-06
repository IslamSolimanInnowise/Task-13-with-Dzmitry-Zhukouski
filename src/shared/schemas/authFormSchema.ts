import { z } from 'zod';

import { emailFieldSchema } from './emailSchema';
import { passwordFieldSchema } from './passwordSchema';

const authFormSchema = z.object({
  email: emailFieldSchema,
  password: passwordFieldSchema,
});

type AuthForm = z.infer<typeof authFormSchema>;

const defaultValues: AuthForm = {
  email: '',
  password: '',
};

export { type AuthForm, authFormSchema, defaultValues };
