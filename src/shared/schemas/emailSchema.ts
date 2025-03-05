import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

type Email = z.infer<typeof emailSchema>;

const defaultValues: Email = {
  email: '',
};

export { defaultValues, type Email, emailSchema };
