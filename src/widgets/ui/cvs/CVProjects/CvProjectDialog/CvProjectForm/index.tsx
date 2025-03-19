import { Container, Tag, VStack } from '@chakra-ui/react';
import Select from '@entities/ui/Select';
import { Field } from '@shared/ui/field';
import { Project } from 'cv-graphql';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledInput, StyledTextArea } from '../cvProjectDialog.styled';
import type { FormValues } from '../index.d';

type CvProjectFormProps = {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  selectedProject: Project | undefined;
  updatingMode: boolean;
  itemsList: Array<{ id: string; name: string }>;
  loadings: boolean;
};

const CvProjectForm = ({
  control,
  errors,
  selectedProject,
  updatingMode = false,
  itemsList,
  loadings,
}: CvProjectFormProps) => {
  const { t } = useTranslation('cvProjects');

  return (
    <VStack as="form" gap={8}>
      <Container display="flex" gap={8}>
        <Controller
          control={control}
          name="id"
          defaultValue=""
          render={({ field }) => (
            <Select
              placeholderText={t(
                'cvProjectDialog.form.inputProjectPlaceholder',
              )}
              itemsList={itemsList}
              isReadOnly={loadings || updatingMode}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="domain"
          defaultValue=""
          render={({ field }) => (
            <StyledInput
              {...field}
              disabled={updatingMode}
              placeholder={t('cvProjectDialog.form.inputDomainPlaceholder')}
              readOnly
            />
          )}
        />
      </Container>
      <Container display="flex" gap={8}>
        <Controller
          control={control}
          name="start_date"
          defaultValue=""
          render={({ field }) => (
            <Field
              errorText={errors.start_date?.message}
              invalid={!!errors.start_date}
            >
              <StyledInput
                type="date"
                disabled={!selectedProject && !updatingMode}
                {...field}
              />
            </Field>
          )}
        />
        <Controller
          control={control}
          name="end_date"
          defaultValue=""
          render={({ field }) => (
            <Field
              errorText={errors.end_date?.message}
              invalid={!!errors.end_date}
            >
              <StyledInput
                type="date"
                disabled={!selectedProject && !updatingMode}
                {...field}
              />
            </Field>
          )}
        />
      </Container>
      <Controller
        control={control}
        name="description"
        defaultValue=""
        render={({ field }) => (
          <StyledTextArea
            {...field}
            disabled={updatingMode}
            placeholder={t('cvProjectDialog.form.inputDescriptionPlaceholder')}
            rows={4}
            resize="none"
            readOnly
          />
        )}
      />
      <Controller
        control={control}
        name="responsibilities"
        defaultValue=""
        render={({ field }) => (
          <StyledInput
            placeholder={t(
              'cvProjectDialog.form.inputResponsibilitiesPlaceholder',
            )}
            {...field}
          />
        )}
      />
      <Container display="flex" flexWrap="wrap" gap={2}>
        {selectedProject?.environment?.map((env: string, index: number) => (
          <Tag.Root key={index}>
            <Tag.Label>{env}</Tag.Label>
          </Tag.Root>
        ))}
      </Container>
    </VStack>
  );
};

export default CvProjectForm;
