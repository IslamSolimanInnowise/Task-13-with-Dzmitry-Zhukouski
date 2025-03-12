import { z } from 'zod';

const updateUserFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  departmentName: z.string().optional(),
  positionName: z.string().optional(),
  role: z.string().optional(),
});

type UpdateUserForm = z.infer<typeof updateUserFormSchema>;

const defaultValues: UpdateUserForm = {
  firstName: '',
  lastName: '',
  departmentName: '',
  positionName: '',
  role: 'Employee',
};

export { defaultValues, type UpdateUserForm, updateUserFormSchema };
