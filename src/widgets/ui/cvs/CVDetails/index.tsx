import Spinner from '@entities/ui/Spinner';
import useGetCvById from '@features/hooks/cvs/useGetCvById';
import useUpdateCv from '@features/hooks/cvs/useUpdateCv';
import { zodResolver } from '@hookform/resolvers/zod';
import { authVar } from '@shared/store/globalAuthState';
import { Field } from '@shared/ui/field';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import {
  StyledForm,
  StyledInput,
  StyledTextArea,
  UpdateButton,
} from './cvdetails.styles';

const schema = z
  .object({
    name: z.string().min(1),
    education: z.string().optional(),
    description: z.string().min(1),
  })
  .refine((data) => Object.values(data).some((value) => value?.trim()), {
    path: ['name'],
  });

type FormData = z.infer<typeof schema>;

type CVDetailsProps = {
  cvId: string;
};

const CVDetails: React.FC<CVDetailsProps> = ({ cvId }) => {
  const { t } = useTranslation('cvs');
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

  if (loading) return <Spinner />;

  return (
    <StyledForm as="form">
      <Field errorText={t('details.requiredError')} invalid={!!errors.name}>
        <StyledInput
          {...register('name')}
          placeholder={t('details.inputNamePlaceholder')}
          readOnly={!isOwner}
        />
      </Field>
      <StyledInput
        {...register('education')}
        placeholder={t('details.inputEducationPlaceholder')}
        readOnly={!isOwner}
      />
      <Field errorText={t('details.requiredError')} invalid={!!errors.description}>
        <StyledTextArea
          {...register('description')}
          placeholder={t('details.inputDescriptionPlaceholder')}
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
          {t('details.confirmButtonText')}
        </UpdateButton>
      )}
    </StyledForm>
  );
};

export default CVDetails;
