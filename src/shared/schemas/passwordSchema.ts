import { z } from 'zod';

const passwordFieldSchema = z.string().min(6);

const passwordSchema = z.object({
  password: passwordFieldSchema,
});

type Password = z.infer<typeof passwordSchema>;

const defaultValues: Password = {
  password: '',
};

export { defaultValues, type Password, passwordFieldSchema, passwordSchema };
