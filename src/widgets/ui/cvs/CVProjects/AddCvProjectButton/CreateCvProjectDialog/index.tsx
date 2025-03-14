import { Container, Dialog, Portal, Tag, VStack } from '@chakra-ui/react';
import useAddCvProject from '@features/hooks/cvs/useAddCvProject';
import useGetProjects from '@features/hooks/cvs/useGetProjects';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDialogHook } from '@shared/Dialogs/createDialogHook';
import { Project } from 'cv-graphql';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  CancelButton,
  ConfirmButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  StyledCloseButton,
  StyledInput,
  StyledTextArea,
} from './createCvProjectDialog.styled';
import CustomSelect from './CustomSelect';

const schema = z.object({
  id: z.string().min(1, 'Project is required'),
  start_date: z.string(),
  end_date: z.string().optional(),
  description: z.string(),
  responsibilities: z.string().optional(),
});

type CreateCvProjectDialogProps = {
  cvId: string;
  cvProjectIds: string[];
  onClose: () => void;
  onConfirm: () => void;
};

const CreateCvProjectDialog = ({
  cvId,
  cvProjectIds,
  onClose,
  onConfirm,
}: CreateCvProjectDialogProps) => {
  const { data: projects, loading: projectsLoading } = useGetProjects();
  const [addCvProject, { loading }] = useAddCvProject(onClose, cvId);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const selectedProjectId = watch('id');
  const selectedProject = projects?.projects.find(
    (p: Project) => p.id === selectedProjectId,
  );

  useEffect(() => {
    if (selectedProject) {
      setValue('start_date', selectedProject.start_date || '');
      setValue('end_date', selectedProject.end_date || '');
      setValue('description', selectedProject.description || '');
      setValue('responsibilities', selectedProject.responsibilities || '');
    }
  }, [selectedProject, setValue]);

  const onSubmit = handleSubmit((data) => {
    const cvProjectData = {
      cvId,
      projectId: data.id,
      start_date: data.start_date,
      end_date: data.end_date ? data.end_date : null,
      roles: selectedProject?.roles || [],
      responsibilities: data.responsibilities,
    };
    addCvProject({ variables: { project: cvProjectData } });
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
                Add project
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
                    render={({ field }) => (
                      <CustomSelect
                        placeholderText="Project"
                        itemsList={projects?.projects
                          .filter((p: Project) => !cvProjectIds.includes(p.id))
                          .map((p: Project) => ({
                            id: p.id,
                            name: p.name,
                          }))}
                        isReadOnly={projectsLoading}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <StyledInput
                    placeholder="Domain"
                    value={selectedProject?.domain || ''}
                    readOnly
                  />
                </Container>
                <Container display="flex" gap={8}>
                  <Controller
                    control={control}
                    name="start_date"
                    render={({ field }) => (
                      <StyledInput
                        type="date"
                        disabled={!selectedProject}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="end_date"
                    render={({ field }) => (
                      <StyledInput
                        type="date"
                        disabled={!selectedProject}
                        {...field}
                      />
                    )}
                  />
                </Container>
                <StyledTextArea
                  placeholder="description"
                  rows={4}
                  resize="none"
                  readOnly
                  value={selectedProject?.description || ''}
                />
                <Controller
                  control={control}
                  name="responsibilities"
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
                disabled={!isValid || !selectedProject || loading}
              >
                Add
              </ConfirmButton>
            </ModalFooter>
          </ModalContent>
        </Dialog.Positioner>
      </Dialog.Root>
    </Portal>
  );
};

const useCreateCvProjectDialog = createDialogHook<CreateCvProjectDialogProps>(
  (props) => <CreateCvProjectDialog {...props} />,
);
export default useCreateCvProjectDialog;
