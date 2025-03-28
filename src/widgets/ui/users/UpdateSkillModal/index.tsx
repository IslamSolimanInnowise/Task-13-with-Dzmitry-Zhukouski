import { NativeSelect } from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';
import Modal from '@entities/ui/Modal/Modal';
import useUpdateProfileSkill from '@features/hooks/users/useUpdateProfileSkill';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultValues,
  type MasterySchema,
  masterySchema,
} from '@shared/schemas/AddSkillFormSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledButton } from './updateSkillModal.styles';

interface UpdateSkillModalProps {
  userId: string;
  name: string;
  oldMastery: string;
  categoryId: string;
  masteryOptions: string[];
}

const UpdateSkillModal: React.FC<UpdateSkillModalProps> = ({
  userId,
  name,
  oldMastery,
  categoryId,
  masteryOptions,
}) => {
  const { t } = useTranslation('users');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MasterySchema>({
    resolver: zodResolver(masterySchema),
    defaultValues,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateSkill] = useUpdateProfileSkill();

  const onSubmit = handleSubmit((data) => {
    updateSkill({
      variables: {
        skill: {
          userId,
          name,
          categoryId,
          mastery: data.mastery || oldMastery,
        },
      },
    });

    setIsModalOpen(false);
  });

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <Modal
      titleText={t('skills.skill.updateSkillModal.modalTitle')}
      confirmText={t('skills.skill.updateSkillModal.modalConfirmText')}
      cancelText={t('skills.skill.updateSkillModal.modalCancelText')}
      onConfirm={onSubmit}
      trigger={
        <StyledButton onClick={handleOpenModal}>
          {t('skills.skill.updateSkillModal.button')}
        </StyledButton>
      }
      open={isModalOpen}
      onOpenChange={(e) => setIsModalOpen(e.open)}
    >
      <form onSubmit={onSubmit}>
        <Field.Root disabled>
          <Field.Label>
            {t('skills.skill.updateSkillModal.skillFieldLabel')}
          </Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field>
              <option value={name}>{name}</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Field.Root invalid={!!errors.mastery}>
          <Field.Label>
            {t('skills.skill.updateSkillModal.masteryFieldLabel')}
          </Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field
              {...register('mastery')}
              defaultValue={oldMastery}
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
            {t('skills.skill.updateSkillModal.masteryFieldError')}
          </Field.ErrorText>
        </Field.Root>
      </form>
    </Modal>
  );
};

export default UpdateSkillModal;
