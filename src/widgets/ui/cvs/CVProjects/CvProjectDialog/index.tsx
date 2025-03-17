import { Dialog, Portal } from '@chakra-ui/react';
import useAddCvProject from '@features/hooks/cvs/useAddCvProject';
import useGetProjects from '@features/hooks/cvs/useGetProjects';
import useUpdateCvProject from '@features/hooks/cvs/useUpdateCvProject';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDialogHook } from '@shared/Dialogs/createDialogHook';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { TableCV } from '../index.d';
import {
  CancelButton,
  ConfirmButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  StyledCloseButton,
} from './cvProjectDialog.styled';
import CvProjectForm from './CvProjectForm';
import type { FormValues } from './index.d';
import { schema } from './schema';

type CvProjectDialogProps = {
  cvId: string;
  selectedProjectName?: string | null;
  cvProjects: TableCV[];
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
    reset,
    trigger,
    formState: { isValid, isDirty, errors },
  } = useForm<FormValues>({
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
            end_date:
              selectedCvProject.end_date === 'Till now'
                ? new Date().toISOString().split('T')[0]
                : selectedCvProject.end_date || '',
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
              <CvProjectForm
                control={control}
                errors={errors}
                selectedProject={selectedProject}
                selectedProjectName={selectedProjectName}
                itemsList={itemsList}
                loadings={loadings}
              />
            </Dialog.Body>
            <ModalFooter>
              <CancelButton onClick={onClose}>Cancel</CancelButton>
              <ConfirmButton
                onClick={onSubmit}
                disabled={
                  !isValid ||
                  (!selectedProject && !selectedProjectName) ||
                  loadings ||
                  (!!selectedProjectName && !isDirty)
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
