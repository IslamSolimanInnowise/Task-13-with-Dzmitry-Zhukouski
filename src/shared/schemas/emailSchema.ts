import { z } from 'zod';

const emailFieldSchema = z.string().email({ message: 'Invalid email address' });

const emailSchema = z.object({
  email: emailFieldSchema,
});

type Email = z.infer<typeof emailSchema>;

const defaultValues: Email = {
  email: '',
};

export { defaultValues, type Email, emailFieldSchema, emailSchema };
