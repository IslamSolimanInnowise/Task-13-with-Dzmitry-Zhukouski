import { Button, NativeSelect, VStack } from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';
import Modal from '@entities/ui/Modal/Modal';
import useAddSkill from '@features/hooks/users/useAddSkill';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addSkillFormSchema,
  AddSkillSchema,
  defaultValues,
} from '@shared/schemas/AddSkillFormSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Skill } from '../types';

interface AddSkillModalProps {
  userId: string;
  categories: {
    skillCategories: Skill[];
  };
  skillsObj: Record<string, Skill[]>;
  masteryOptions: string[];
}

const AddSkillModal: React.FC<AddSkillModalProps> = ({
  userId,
  categories,
  skillsObj,
  masteryOptions,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSkillSchema>({
    resolver: zodResolver(addSkillFormSchema),
    mode: 'all',
    defaultValues,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    setIsModalOpen(false);
  });

  return (
    <Modal
      titleText="Add Skill"
      confirmText="Confirm"
      onConfirm={onSubmit}
      trigger={
        <Button w="full" mt="8" onClick={() => setIsModalOpen(true)}>
          + ADD SKILL
        </Button>
      }
      open={isModalOpen}
      onOpenChange={(e) => setIsModalOpen(e.open)}
    >
      <form onSubmit={onSubmit}>
        <VStack gap="8">
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
            <Field.ErrorText>{errors.mastery?.message}</Field.ErrorText>
          </Field.Root>
        </VStack>
      </form>
    </Modal>
  );
};

export default AddSkillModal;
