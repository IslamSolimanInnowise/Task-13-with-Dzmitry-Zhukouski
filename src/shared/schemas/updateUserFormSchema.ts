import { z } from 'zod';

const updateUserFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
  role: z.string().optional(),
});

type UpdateUserForm = z.infer<typeof updateUserFormSchema>;

const defaultValues: UpdateUserForm = {
  firstName: '',
  lastName: '',
  department: '',
  position: '',
  role: 'Employee',
};

export { defaultValues, type UpdateUserForm, updateUserFormSchema };
