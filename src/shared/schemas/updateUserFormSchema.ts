import { z } from 'zod';

const updateUserFormSchema = z.object({
  profile: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
  }),
  department_name: z.string().optional(),
  position_name: z.string().optional(),
  role: z.string().optional(),
});

type UpdateUserForm = z.infer<typeof updateUserFormSchema>;

const defaultValues: UpdateUserForm = {
  profile: {
    first_name: '',
    last_name: '',
  },
  department_name: '',
  position_name: '',
  role: 'Employee',
};

export { defaultValues, type UpdateUserForm, updateUserFormSchema };
