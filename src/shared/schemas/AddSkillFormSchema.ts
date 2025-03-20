import { z } from 'zod';

const masterySchema = z.object({
  mastery: z.string().min(1),
});

const addSkillFormSchema = masterySchema.extend({
  skill: z.string().min(1),
});

type AddSkillSchema = z.infer<typeof addSkillFormSchema>;
type MasterySchema = z.infer<typeof masterySchema>;

const defaultValues: AddSkillSchema = {
  skill: '',
  mastery: '',
};

export {
  addSkillFormSchema,
  type AddSkillSchema,
  defaultValues,
  type MasterySchema,
  masterySchema,
};
