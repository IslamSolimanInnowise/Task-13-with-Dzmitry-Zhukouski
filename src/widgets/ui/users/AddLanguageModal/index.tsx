import { Field, NativeSelect } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
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

  return (
    <Modal
      titleText="Add Language"
      confirmText="Confirm"
      cancelText="Cancel"
      onConfirm={onSubmit}
      trigger={
        <Button
          w="full"
          mt="8"
          disabled={languages.length === 0}
          onClick={() => setIsModalOpen(true)}
        >
          + ADD Language
        </Button>
      }
      open={isModalOpen}
      onOpenChange={(e) => setIsModalOpen(e.open)}
    >
      <form onSubmit={onSubmit}>
        <VStack gap="8">
          <Field.Root invalid={!!errors.name}>
            <Field.Label>Language</Field.Label>
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
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.proficiency}>
            <Field.Label>Language Proficiency</Field.Label>
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
            <Field.ErrorText>{errors.proficiency?.message}</Field.ErrorText>
          </Field.Root>
        </VStack>
      </form>
    </Modal>
  );
};

export default AddLanguageModal;
