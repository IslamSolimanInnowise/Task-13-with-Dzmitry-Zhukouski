import { z } from 'zod';

const _emailSchema = z.string().email({ message: 'Invalid email address' });

const emailSchema = z.object({
  email: _emailSchema,
});

type Email = z.infer<typeof emailSchema>;

const defaultValues: Email = {
  email: '',
};

export { _emailSchema, defaultValues, type Email, emailSchema };
