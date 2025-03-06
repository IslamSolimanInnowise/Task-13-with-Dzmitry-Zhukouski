import { z } from 'zod';

const _verifyEmailSchema = z
  .string()
  .length(6, { message: 'The verification code consists of 6 characters' });

const verifyEmailSchema = z.object({
  otp: _verifyEmailSchema,
});

type Mail = z.infer<typeof verifyEmailSchema>;

const defaultValues: Mail = {
  otp: '',
};

export { _verifyEmailSchema, defaultValues, type Mail, verifyEmailSchema };
