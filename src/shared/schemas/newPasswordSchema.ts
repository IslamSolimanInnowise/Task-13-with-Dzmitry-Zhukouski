import { z } from 'zod';

import { _passwordSchema } from './passwordSchema';

const newPasswordSchema = z.object({
  newPassword: _passwordSchema,
});

type NewPassword = z.infer<typeof newPasswordSchema>;

const defaultValues: NewPassword = {
  newPassword: '',
};

export { _passwordSchema, defaultValues, type NewPassword, newPasswordSchema };
