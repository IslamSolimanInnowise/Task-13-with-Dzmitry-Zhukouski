import { Container, Dialog, Portal, Tag, VStack } from '@chakra-ui/react';
import useAddCvProject from '@features/hooks/cvs/useAddCvProject';
import useGetProjects from '@features/hooks/cvs/useGetProjects';
import useUpdateCvProject from '@features/hooks/cvs/useUpdateCvProject';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDialogHook } from '@shared/Dialogs/createDialogHook';
import { Project } from 'cv-graphql';
import { CvProject } from 'cv-graphql';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

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

const schema = z.object({
  id: z.string().min(1, 'Project is required'),
  domain: z.string(),
  start_date: z.string(),
  end_date: z.string().optional(),
  description: z.string(),
  responsibilities: z.string().optional(),
});

type CvProjectDialogProps = {
  cvId: string;
  selectedProjectName?: string | null;
  cvProjects: CvProject[];
  onClose: () => void;
  onConfirm: () => void;
};

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
    setValue,
    trigger,
    formState: { isValid },
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
    (p: Project) => p.id === selectedProjectId,
  );

  const itemsList = selectedProjectName
    ? cvProjects
        .filter((p: CvProject) => p.name === selectedProjectName)
        .map((p: CvProject) => ({
          id: p.id,
          name: p.name,
        }))
    : projects?.projects
        ?.filter(
          (p: Project) =>
            !cvProjects?.some((cvProject) => cvProject.name === p.name),
        )
        .map((p: Project) => ({
          id: p.id,
          name: p.name,
        }));

  useEffect(() => {
    if (selectedProjectName) {
      const selectedCvProject = cvProjects?.find(
        (p: CvProject) => p.name === selectedProjectName,
      );

      if (selectedCvProject) {
        setValue('id', selectedCvProject.id);
        setValue('domain', selectedCvProject.domain || '');
        setValue('start_date', selectedCvProject.start_date || '');
        setValue('end_date', selectedCvProject.end_date || '');
        setValue('description', selectedCvProject.description || '');
        setValue(
          'responsibilities',
          selectedCvProject.responsibilities?.join(', ') ?? '',
        );
        trigger();
      }
    } else if (selectedProject) {
      setValue('id', selectedProject.id);
      setValue('domain', selectedProject.domain || '');
      setValue('start_date', selectedProject.start_date || '');
      setValue('end_date', selectedProject.end_date || '');
      setValue('description', selectedProject.description || '');
      trigger();
    }
  }, [cvProjects, selectedProjectName, selectedProject, setValue, trigger]);

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
                      <StyledInput
                        type="date"
                        disabled={!selectedProject && !selectedProjectName}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="end_date"
                    defaultValue=""
                    render={({ field }) => (
                      <StyledInput
                        type="date"
                        disabled={!selectedProject && !selectedProjectName}
                        {...field}
                      />
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
                  loadings
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
