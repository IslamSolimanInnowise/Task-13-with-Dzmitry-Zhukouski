import { VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@shared/ui/field';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { StyledInput, StyledTextArea, UpdateButton } from './cvdetails.styles';

const schema = z
  .object({
    name: z.string().min(1, { message: 'Required field' }),
    education: z.string().optional(),
    description: z.string().min(1, { message: 'Required field' }),
  })
  .refine((data) => Object.values(data).some((value) => value?.trim()), {
    message: 'At least one field must be filled',
    path: ['name'],
  });

type FormData = z.infer<typeof schema>;

type CVDetailsProps = {
  cvId: string;
};

const CVDetails: React.FC<CVDetailsProps> = ({ cvId }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <VStack as="form" gap={8} p="2rem 1.5rem" maxW="900px" margin="0 auto">
      <Field errorText={errors.name?.message} invalid={!!errors.name}>
        <StyledInput {...register('name')} placeholder="Name" />
      </Field>
      <StyledInput {...register('education')} placeholder="Education" />
      <Field
        errorText={errors.description?.message}
        invalid={!!errors.description}
      >
        <StyledTextArea
          {...register('description')}
          placeholder="Description"
          rows={4}
          resize="none"
        />
      </Field>
      <UpdateButton onClick={onSubmit} disabled={!isValid || isSubmitting}>
        Update
      </UpdateButton>
    </VStack>
  );
};

export default CVDetails;
