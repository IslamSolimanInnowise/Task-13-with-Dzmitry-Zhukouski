import { z } from 'zod';

const verifyEmailFieldSchema = z.string().length(6);

const verifyEmailSchema = z.object({
  otp: verifyEmailFieldSchema,
});

type Mail = z.infer<typeof verifyEmailSchema>;

const defaultValues: Mail = {
  otp: '',
};

export { defaultValues, type Mail, verifyEmailFieldSchema, verifyEmailSchema };
