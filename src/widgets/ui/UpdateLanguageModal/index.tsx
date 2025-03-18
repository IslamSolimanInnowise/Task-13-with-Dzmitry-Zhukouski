import { Button, Field, NativeSelect } from '@chakra-ui/react';
import Modal from '@entities/ui/Modal/Modal';
import useUpdateProfileLanguage from '@features/hooks/users/useUpdateProfileLanguage';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProficiencySchema,
  proficiencySchema,
} from '@shared/schemas/addLanguageSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Language } from '../users/types';

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

  return (
    <Modal
      titleText="Update Language"
      confirmText="Update"
      cancelText="Cancel"
      onConfirm={onSubmit}
      trigger={
        <Button px="2" onClick={() => setIsModalOpen(true)}>
          Update
        </Button>
      }
      open={isModalOpen}
      onOpenChange={(e) => setIsModalOpen(e.open)}
    >
      <form onSubmit={onSubmit}>
        <Field.Root disabled>
          <Field.Label>Language</Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field>
              <option value={name}>{name}</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Field.Root invalid={!!errors.proficiency}>
          <Field.Label>Language Profiency</Field.Label>
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
          <Field.ErrorText>{errors.proficiency?.message}</Field.ErrorText>
        </Field.Root>
      </form>
    </Modal>
  );
};

export default UpdateLanguageModal;
