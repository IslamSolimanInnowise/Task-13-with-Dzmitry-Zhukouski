import { VStack } from '@chakra-ui/react';
import CustomSpinner from '@entities/ui/Spinner';
import useGetCvById from '@features/hooks/cvs/useGetCvById';
import useUpdateCv from '@features/hooks/cvs/useUpdateCv';
import { zodResolver } from '@hookform/resolvers/zod';
import { authVar } from '@shared/store/globalAuthState';
import { Field } from '@shared/ui/field';
import { useEffect } from 'react';
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
  const { data: CVdata, loading } = useGetCvById(cvId);
  const [updateCv, { loading: updateLoading }] = useUpdateCv();

  const { id } = authVar();
  const isOwner = CVdata?.cv?.user?.id === id;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isDirty },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      education: '',
      description: '',
    },
  });

  useEffect(() => {
    if (CVdata) {
      reset({
        name: CVdata.cv.name || '',
        education: CVdata.cv.education || '',
        description: CVdata.cv.description || '',
      });
    }
  }, [CVdata, reset]);

  const onSubmit = handleSubmit((data) => {
    const cv = {
      cvId,
      ...data,
    };
    updateCv({ variables: { cv } });
  });

  if (loading) return <CustomSpinner />;

  return (
    <VStack as="form" gap={8} p="2rem 1.5rem" maxW="900px" margin="0 auto">
      <Field errorText={errors.name?.message} invalid={!!errors.name}>
        <StyledInput
          {...register('name')}
          placeholder="Name"
          readOnly={!isOwner}
        />
      </Field>
      <StyledInput
        {...register('education')}
        placeholder="Education"
        readOnly={!isOwner}
      />
      <Field
        errorText={errors.description?.message}
        invalid={!!errors.description}
      >
        <StyledTextArea
          {...register('description')}
          placeholder="Description"
          rows={4}
          resize="none"
          readOnly={!isOwner}
        />
      </Field>
      {isOwner && (
        <UpdateButton
          onClick={onSubmit}
          disabled={!isValid || isSubmitting || !isDirty || updateLoading}
        >
          Update
        </UpdateButton>
      )}
    </VStack>
  );
};

export default CVDetails;
