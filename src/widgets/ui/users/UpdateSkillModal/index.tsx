import { Button, NativeSelect } from '@chakra-ui/react';
import { Field } from '@chakra-ui/react';
import Modal from '@entities/ui/Modal/Modal';
import useAddSkill from '@features/hooks/users/useAddSkill';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultValues,
  type MasterySchema,
  masterySchema,
} from '@shared/schemas/AddSkillFormSchema';
import { useForm } from 'react-hook-form';

import { Skill } from '../types';

interface UpdateSkillModalProps {
  userId: string;
  masteryOptions: string[];
}

const UpdateSkillModal: React.FC<UpdateSkillModalProps> = ({
  userId,
  masteryOptions,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MasterySchema>({
    resolver: zodResolver(masterySchema),
    mode: 'all',
    defaultValues,
  });

  const onSubmit = handleSubmit((data) => {});

  return (
    <Modal
      titleText="Update Skill"
      confirmText="Update"
      onConfirm={onSubmit}
      trigger={<Button px="2">Update</Button>}
    >
      <form onSubmit={onSubmit}>
        <Field.Root disabled>
          <Field.Label>Skill</Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field>
              <option value=""></option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Field.Root invalid={!!errors.mastery}>
          <Field.Label>Skill Mastery</Field.Label>
          <NativeSelect.Root size="md">
            <NativeSelect.Field {...register('mastery')}>
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
      </form>
    </Modal>
  );
};

export default UpdateSkillModal;
