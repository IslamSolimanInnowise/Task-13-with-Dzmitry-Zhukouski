import { z } from 'zod';

const proficiencySchema = z.object({
  proficiency: z.string().min(1),
});

const addLanguageFormSchema = proficiencySchema.extend({
  name: z.string().min(1),
});

type AddLanguageForm = z.infer<typeof addLanguageFormSchema>;
type ProficiencySchema = z.infer<typeof proficiencySchema>;

const defaultValues: AddLanguageForm = {
  name: '',
  proficiency: '',
};

export {
  type AddLanguageForm,
  addLanguageFormSchema,
  defaultValues,
  type ProficiencySchema,
  proficiencySchema,
};
