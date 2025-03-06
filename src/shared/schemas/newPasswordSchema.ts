import { z } from 'zod';

import { passwordFieldSchema } from './passwordSchema';

const newPasswordSchema = z.object({
  newPassword: passwordFieldSchema,
});

type NewPassword = z.infer<typeof newPasswordSchema>;

const defaultValues: NewPassword = {
  newPassword: '',
};

export {
  defaultValues,
  type NewPassword,
  newPasswordSchema,
  passwordFieldSchema,
};
