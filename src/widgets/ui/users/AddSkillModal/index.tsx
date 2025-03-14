import { Button, NativeSelect } from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';
import Modal from '@entities/ui/Modal/Modal';
import useAddSkill from '@features/hooks/users/useAddSkill';
import useGetSkillCategories from '@features/hooks/users/useGetSkillCategories';
import useGetSkills from '@features/hooks/users/useGetSkills';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addSkillFormSchema,
  AddSkillSchema,
  defaultValues,
} from '@shared/schemas/AddSkillFormSchema';
import { useForm } from 'react-hook-form';
import { Skill } from '../types';

interface AddSkillModalProps {
  userId: string;
}

const AddSkillModal: React.FC<AddSkillModalProps> = ({ userId }) => {
  const { data, loading: skillLoading } = useGetSkills();
  const { data: categories } = useGetSkillCategories();

  const skillsObj = data?.skills?.reduce(
    (acc: Record<string, Skill[]>, skill: Skill) => {
      const key = skill.category_parent_name ?? skill.category_name;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(skill);
      return acc;
    },
    {},
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSkillSchema>({
    resolver: zodResolver(addSkillFormSchema),
    mode: 'all',
    defaultValues,
  });

  const [addSkill] = useAddSkill();

  const onSubmit = handleSubmit((data) => {
    const categoryId = categories?.skillCategories?.find(
      (category: { name: string }) => category.name === data.skill,
    );

    addSkill({
      variables: {
        skill: {
          userId,
          name: data.skill,
          categoryId,
          mastery: data.mastery,
        },
      },
    });
  });

  return (
    <Modal
      titleText="Add Skill"
      confirmText="Confirm"
      onConfirm={onSubmit}
      trigger={
        <Button w="full" mt="8">
          + ADD SKILL
        </Button>
      }
    >
      <form onSubmit={onSubmit}>
        {!skillLoading && (
          <>
            <Field.Root invalid={!!errors.skill}>
              <Field.Label>Skill</Field.Label>
              <NativeSelect.Root size="md">
                <NativeSelect.Field {...register('skill')}>
                  {Object.entries(skillsObj as Record<string, Skill[]>).map(
                    ([key, value]) => {
                      return (
                        <optgroup label={key} key={key}>
                          {value?.map((skill) => {
                            return (
                              <option value={skill.name} key={skill.id}>
                                {skill.name}
                              </option>
                            );
                          })}
                        </optgroup>
                      );
                    },
                  )}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Field.ErrorText>{errors.skill?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.mastery}>
              <Field.Label>Skill Mastery</Field.Label>
              <NativeSelect.Root size="md">
                <NativeSelect.Field
                  {...register('mastery')}
                  defaultValue="Novice"
                >
                  {masteryOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Field.ErrorText>{errors.skill?.message}</Field.ErrorText>
            </Field.Root>
          </>
        )}
      </form>
    </Modal>
  );
};

const masteryOptions = [
  'Novice',
  'Advanced',
  'Competent',
  'Proficient',
  'Expert',
];

export default AddSkillModal;
