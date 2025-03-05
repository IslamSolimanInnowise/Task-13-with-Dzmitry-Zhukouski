import { z } from 'zod';

import { emailSchema } from './emailSchema';

const authFormSchema = emailSchema.extend({
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type AuthForm = z.infer<typeof authFormSchema>;

const defaultValues: AuthForm = {
  email: '',
  password: '',
};
export { type AuthForm, authFormSchema, defaultValues };
