import { Dialog, Portal } from '@chakra-ui/react';
import useAddCvProject from '@features/hooks/cvs/useAddCvProject';
import useGetProjects from '@features/hooks/cvs/useGetProjects';
import useUpdateCvProject from '@features/hooks/cvs/useUpdateCvProject';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDialogHook } from '@shared/Dialogs/createDialogHook';
import { notify } from '@shared/Notifications/notify';
import { Cv, CvProject } from 'cv-graphql';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  cvId: Cv['id'];
  cvProjects: TableCV[];
  title: string;
  submitText: string;
  updatingMode?: boolean;
  updatingCvProject?: TableCV;
  updatingFormValues?: Pick<
    CvProject,
    'id' | 'domain' | 'start_date' | 'end_date' | 'description'
  > & { responsibilities?: string };
  onClose: () => void;
  onConfirm: () => void;
};

const CvProjectDialog = ({
  cvId,
  cvProjects,
  title,
  submitText,
  updatingMode = false,
  updatingCvProject,
  updatingFormValues,
  onClose,
  onConfirm,
}: CvProjectDialogProps) => {
  const { t } = useTranslation('cvs');
  const { data: projects, loading: projectsLoading } = useGetProjects();
  const [addCvProject, { loading: addCvProjectLoading }] =
    useAddCvProject(cvId);
  const [updateCvProject, { loading: updateCvProjectLoading }] =
    useUpdateCvProject(cvId);

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

  const itemsList = updatingMode
    ? [{ id: updatingCvProject?.projectId, name: updatingCvProject?.name }]
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
      if (updatingMode) {
        reset({
          ...updatingFormValues,
          end_date: updatingFormValues?.end_date ?? '',
        });
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
  }, [
    cvProjects,
    selectedProject,
    trigger,
    reset,
    updatingCvProject,
    updatingMode,
    updatingFormValues,
  ]);

  const onSubmit = handleSubmit((data) => {
    const cvProjectData = {
      cvId,
      projectId: data.id,
      start_date: data.start_date,
      end_date: data.end_date ? data.end_date : null,
      roles: selectedProject?.roles || [],
      responsibilities: [data.responsibilities],
    };

    if (updatingMode) {
      updateCvProject({
        variables: { project: cvProjectData },
        onCompleted: () => {
          notify({
            type: 'success',
            title: t('notifications.useUpdateCvProject.success'),
          });
          onClose();
        },
      });
    } else {
      addCvProject({
        variables: { project: cvProjectData },
        onCompleted: () => {
          notify({
            type: 'success',
            title: t('notifications.useAddCvProject.success'),
          });
          onClose();
        },
      });
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
                {title}
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
                updatingMode={updatingMode}
                itemsList={itemsList}
                loadings={loadings}
              />
            </Dialog.Body>
            <ModalFooter>
              <CancelButton onClick={onClose}>
                {t('projects.cvProjectDialog.cancelButtonText')}
              </CancelButton>
              <ConfirmButton
                onClick={onSubmit}
                disabled={
                  !isValid ||
                  (!selectedProject && !updatingMode) ||
                  loadings ||
                  (updatingMode && !isDirty)
                }
              >
                {submitText}
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
