import { z } from 'zod';

const masterySchema = z.object({
  mastery: z.string().optional(),
});

const addSkillFormSchema = masterySchema.extend({
  skill: z.string().optional(),
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
