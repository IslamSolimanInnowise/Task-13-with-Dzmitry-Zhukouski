import { Container, Dialog, Portal, Tag, VStack } from '@chakra-ui/react';
import useAddCvProject from '@features/hooks/cvs/useAddCvProject';
import useGetProjects from '@features/hooks/cvs/useGetProjects';
import useUpdateCvProject from '@features/hooks/cvs/useUpdateCvProject';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDialogHook } from '@shared/Dialogs/createDialogHook';
import { Field } from '@shared/ui/field';
import { Project } from 'cv-graphql';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { TableCV } from '..';
import CustomSelect from './CustomSelect';
import {
  CancelButton,
  ConfirmButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  StyledCloseButton,
  StyledInput,
  StyledTextArea,
} from './cvProjectDialog.styled';

type CvProjectDialogProps = {
  cvId: string;
  selectedProjectName?: string | null;
  cvProjects: TableCV[];
  onClose: () => void;
  onConfirm: () => void;
};

const schema = z
  .object({
    id: z.string().min(1, 'Project is required'),
    domain: z.string(),
    start_date: z
      .string()
      .min(1, 'Start date is required')
      .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Invalid date format',
      })
      .refine(
        (value) => {
          const year = new Date(value).getFullYear();
          return year >= 2000 && year <= 2100;
        },
        { message: 'Year must be between 2000-2100' },
      ),
    end_date: z
      .string()
      .optional()
      .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Invalid date format',
      })
      .refine(
        (value) => {
          if (!value) return true;
          const year = new Date(value).getFullYear();
          return year >= 2000 && year <= 2100;
        },
        { message: 'Year must be between 2000-2100' },
      ),
    description: z.string(),
    responsibilities: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.end_date && new Date(data.end_date) < new Date(data.start_date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['end_date'],
        message: 'End date cannot be earlier than start date',
      });
    }
  });

const CvProjectDialog = ({
  cvId,
  selectedProjectName = null,
  cvProjects,
  onClose,
  onConfirm,
}: CvProjectDialogProps) => {
  const { data: projects, loading: projectsLoading } = useGetProjects();
  const [addCvProject, { loading: addCvProjectLoading }] = useAddCvProject(
    onClose,
    cvId,
  );
  const [updateCvProject, { loading: updateCvProjectLoading }] =
    useUpdateCvProject(onClose, cvId);

  const loadings =
    projectsLoading || addCvProjectLoading || updateCvProjectLoading;

  const {
    control,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { isValid, isDirty, errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      id: '',
      domain: '',
      start_date: '',
      end_date: '',
      description: '',
      responsibilities: '',
    },
  });

  const selectedProjectId = watch('id');
  const selectedProject = projects?.projects.find(
    (p: TableCV) => p.id === selectedProjectId,
  );

  const itemsList = selectedProjectName
    ? cvProjects
        .filter((p: TableCV) => p.name === selectedProjectName)
        .map((p: TableCV) => ({
          id: p.id,
          name: p.name,
        }))
    : projects?.projects
        ?.filter(
          (p: TableCV) =>
            !cvProjects?.some((cvProject) => cvProject.name === p.name),
        )
        .map((p: TableCV) => ({
          id: p.id,
          name: p.name,
        }));

  useEffect(() => {
    const initializeForm = () => {
      if (selectedProjectName) {
        const selectedCvProject = cvProjects?.find(
          (p: TableCV) => p.name === selectedProjectName,
        );

        if (selectedCvProject) {
          const formValues = {
            id: selectedCvProject.projectId || '',
            domain: selectedCvProject.domain || '',
            start_date: selectedCvProject.start_date || '',
            end_date: selectedCvProject.end_date || '',
            description: selectedCvProject.description || '',
            responsibilities:
              selectedCvProject.responsibilities?.join(', ') ?? '',
          };
          reset(formValues);
        }
      } else if (selectedProject) {
        const formValues = {
          id: selectedProject.id,
          domain: selectedProject.domain || '',
          start_date: selectedProject.start_date || '',
          end_date: selectedProject.end_date || '',
          description: selectedProject.description || '',
          responsibilities: '',
        };
        reset(formValues);
      }
    };

    initializeForm();
  }, [cvProjects, selectedProjectName, selectedProject, trigger, reset]);

  const onSubmit = handleSubmit((data) => {
    const cvProjectData = {
      cvId,
      projectId: data.id,
      start_date: data.start_date,
      end_date: data.end_date ? data.end_date : null,
      roles: selectedProject?.roles || [],
      responsibilities: [data.responsibilities],
    };

    if (selectedProjectName) {
      updateCvProject({ variables: { project: cvProjectData } });
    } else {
      addCvProject({ variables: { project: cvProjectData } });
    }
    onConfirm();
  });

  return (
    <Portal>
      <Dialog.Root
        open={true}
        onOpenChange={() => onClose()}
        trapFocus={true}
        motionPreset="scale"
        placement="center"
        size="xl"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <ModalContent>
            <ModalHeader>
              <Dialog.Title fontSize="lg" fontWeight="600">
                {selectedProjectName ? 'Update project' : 'Add project'}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <StyledCloseButton />
              </Dialog.CloseTrigger>
            </ModalHeader>
            <Dialog.Body py={4}>
              <VStack as="form" gap={8}>
                <Container display="flex" gap={8}>
                  <Controller
                    control={control}
                    name="id"
                    defaultValue=""
                    render={({ field }) => (
                      <CustomSelect
                        placeholderText="Project"
                        itemsList={itemsList}
                        isReadOnly={loadings || !!selectedProjectName}
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
                        disabled={!!selectedProjectName}
                        placeholder="Domain"
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
                        invalid={Boolean(errors.start_date)}
                      >
                        <StyledInput
                          type="date"
                          disabled={!selectedProject && !selectedProjectName}
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
                        invalid={Boolean(errors.end_date)}
                      >
                        <StyledInput
                          type="date"
                          disabled={!selectedProject && !selectedProjectName}
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
                      disabled={!!selectedProjectName}
                      placeholder="Description"
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
                    <StyledInput placeholder="Responsibilities" {...field} />
                  )}
                />
                <Container display="flex" flexWrap="wrap" gap={2}>
                  {selectedProject?.environment?.map(
                    (env: Project['environment'], index: number) => (
                      <Tag.Root key={index}>
                        <Tag.Label>{env}</Tag.Label>
                      </Tag.Root>
                    ),
                  )}
                </Container>
              </VStack>
            </Dialog.Body>
            <ModalFooter>
              <CancelButton onClick={onClose}>Cancel</CancelButton>
              <ConfirmButton
                onClick={onSubmit}
                disabled={
                  !isValid ||
                  (!selectedProject && !selectedProjectName) ||
                  loadings ||
                  !isDirty
                }
              >
                {selectedProjectName ? 'Update' : 'Create & Add'}
              </ConfirmButton>
            </ModalFooter>
          </ModalContent>
        </Dialog.Positioner>
      </Dialog.Root>
    </Portal>
  );
};

const useCvProjectDialog = createDialogHook<CvProjectDialogProps>((props) => (
  <CvProjectDialog {...props} />
));
export default useCvProjectDialog;
