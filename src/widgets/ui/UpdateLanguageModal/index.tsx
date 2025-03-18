import { Field, NativeSelect } from '@chakra-ui/react';
import Modal from '@entities/ui/Modal/Modal';
import useUpdateProfileLanguage from '@features/hooks/users/useUpdateProfileLanguage';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProficiencySchema,
  proficiencySchema,
} from '@shared/schemas/addLanguageSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Language } from '../users/types';
import { StyledButton } from './updateLanguageModal.styles';

interface UpdateLanguageModalProps extends Language {
  proficiencyLevels: string[];
  userId: string;
}

const UpdateLanguageModal: React.FC<UpdateLanguageModalProps> = ({
  name,
  proficiency,
  proficiencyLevels,
  userId,
}) => {
  const { t } = useTranslation('languages');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProficiencySchema>({
    resolver: zodResolver(proficiencySchema),
    defaultValues: { proficiency: '' },
  });

  const [updateLanguage] = useUpdateProfileLanguage();

  const onSubmit = handleSubmit((data) => {
    updateLanguage({
      variables: {
        language: {
          userId,
          name,
          proficiency: data.proficiency,
        },
      },
    });

    setIsModalOpen(false);
  });

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <Modal
      titleText={t('language.updateLanguageModal.modalTitle')}
      confirmText={t('language.updateLanguageModal.modalConfirmText')}
      cancelText={t('language.updateLanguageModal.modalCancelText')}
      onConfirm={onSubmit}
      trigger={
        <StyledButton onClick={handleOpenModal}>
          {t('language.updateLanguageModal.button')}
        </StyledButton>
      }
      open={isModalOpen}
      onOpenChange={(e) => setIsModalOpen(e.open)}
    >
      <form onSubmit={onSubmit}>
        <Field.Root disabled>
          <Field.Label>
            {t('language.updateLanguageModal.languageFieldLabel')}
          </Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field>
              <option value={name}>{name}</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Field.Root invalid={!!errors.proficiency}>
          <Field.Label>
            {t('language.updateLanguageModal.proficiencyFieldLabel')}
          </Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field
              {...register('proficiency')}
              defaultValue={proficiency}
            >
              {proficiencyLevels.map((level) => (
                <option value={level} key={level}>
                  {level}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Field.ErrorText>
            {t('language.updateLanguageModal.proficiencyFieldError')}
          </Field.ErrorText>
        </Field.Root>
      </form>
    </Modal>
  );
};

export default UpdateLanguageModal;
