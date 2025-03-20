import { Field, NativeSelect } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import Modal from '@entities/ui/Modal/Modal';
import useAddLanguage from '@features/hooks/users/useAddLanguage';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AddLanguageForm,
  addLanguageFormSchema,
  defaultValues,
} from '@shared/schemas/addLanguageSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledButton } from './addLanguageModal.styles';

interface AddLanguageModalProps {
  userId?: string;
  languages: {
    id: string;
    name: string;
  }[];
  proficiencyLevels: string[];
}

const AddLanguageModal: React.FC<AddLanguageModalProps> = ({
  userId,
  languages,
  proficiencyLevels,
}) => {
  const { t } = useTranslation('users');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddLanguageForm>({
    resolver: zodResolver(addLanguageFormSchema),
    mode: 'all',
    defaultValues,
  });

  const [addLanguage] = useAddLanguage();

  const onSubmit = handleSubmit((data) => {
    addLanguage({
      variables: {
        language: {
          userId,
          name: data.name,
          proficiency: data.proficiency,
        },
      },
    });

    setIsModalOpen(false);
  });

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <Modal
      titleText={t('languages.addLanguageModal.modalTitle')}
      confirmText={t('languages.addLanguageModal.modalConfirmText')}
      cancelText={t('languages.addLanguageModal.modalCancelText')}
      onConfirm={onSubmit}
      trigger={
        <StyledButton
          disabled={languages.length === 0}
          onClick={handleOpenModal}
        >
          {t('languages.addLanguageModal.button')}
        </StyledButton>
      }
      open={isModalOpen}
      onOpenChange={(e) => setIsModalOpen(e.open)}
    >
      <form onSubmit={onSubmit}>
        <VStack gap="8">
          <Field.Root invalid={!!errors.name}>
            <Field.Label>
              {t('languages.addLanguageModal.languageFieldLabel')}
            </Field.Label>
            <NativeSelect.Root size="md">
              <NativeSelect.Field {...register('name')} defaultValue="English">
                {languages.map((language) => (
                  <option value={language.name} key={language.id}>
                    {language.name}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            <Field.ErrorText>
              {t('languages.addLanguageModal.languageFieldError')}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.proficiency}>
            <Field.Label>
              {t('languages.addLanguageModal.proficiencyFieldLabel')}
            </Field.Label>
            <NativeSelect.Root size="md">
              <NativeSelect.Field
                {...register('proficiency')}
                defaultValue="A1"
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
              {t('languages.addLanguageModal.proficiencyFieldError')}
            </Field.ErrorText>
          </Field.Root>
        </VStack>
      </form>
    </Modal>
  );
};

export default AddLanguageModal;
