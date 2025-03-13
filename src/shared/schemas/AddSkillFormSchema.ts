import { z } from 'zod';

const addSkillFormSchema = z.object({
  skill: z.string().optional(),
  mastery: z.string().optional(),
});

type AddSkillSchema = z.infer<typeof addSkillFormSchema>;

const defaultValues: AddSkillSchema = {
  skill: '',
  mastery: '',
};

export { addSkillFormSchema, type AddSkillSchema, defaultValues };
