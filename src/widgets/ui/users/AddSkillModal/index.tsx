import { NativeSelect, VStack } from '@chakra-ui/react';
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
import { useTranslation } from 'react-i18next';

import { Skill } from '../types';
import { StyledButton } from './addSkillModal.styles';

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
  const { t } = useTranslation('users');

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

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <Modal
      titleText={t('skills.addSkillModal.modalTitle')}
      confirmText={t('skills.addSkillModal.modalConfirmText')}
      cancelText={t('skills.addSkillModal.modalCancelText')}
      onConfirm={onSubmit}
      trigger={
        <StyledButton onClick={handleOpenModal}>
          {t('skills.addSkillModal.button')}
        </StyledButton>
      }
      open={isModalOpen}
      onOpenChange={(e) => setIsModalOpen(e.open)}
    >
      <form onSubmit={onSubmit}>
        <VStack gap="8">
          <Field.Root invalid={!!errors.skill}>
            <Field.Label>
              {t('skills.addSkillModal.skillFieldLabel')}
            </Field.Label>
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
            <Field.ErrorText>
              {t('skills.addSkillModal.skillFieldError')}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.mastery}>
            <Field.Label>
              {t('skills.addSkillModal.masteryFieldLabel')}
            </Field.Label>
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
            <Field.ErrorText>
              {t('skills.addSkillModal.masteryFieldError')}
            </Field.ErrorText>
          </Field.Root>
        </VStack>
      </form>
    </Modal>
  );
};

export default AddSkillModal;
