import { z } from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  email: '',
  password: '',
};
export { defaultValues, type FormValues, schema };
