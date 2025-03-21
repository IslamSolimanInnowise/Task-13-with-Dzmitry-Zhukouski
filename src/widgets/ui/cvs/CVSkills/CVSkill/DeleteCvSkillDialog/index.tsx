import { Dialog, Portal } from '@chakra-ui/react';
import useDeleteCvSkill from '@features/hooks/cvs/useDeleteCvSkill';
import { createDialogHook } from '@shared/Dialogs/createDialogHook';
import { notify } from '@shared/Notifications/notify';
import { Cv, SkillMastery } from 'cv-graphql';
import { useTranslation } from 'react-i18next';

import {
  CancelButton,
  ConfirmButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  StyledCloseButton,
} from './deleteCvSkillDialog.styled';

type DeleteCvSkillDialogProps = {
  cvId: Cv['id'];
  skillName: SkillMastery['name'];
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteCvSkillDialog = ({
  cvId,
  skillName,
  onClose,
  onConfirm,
}: DeleteCvSkillDialogProps) => {
  const { t } = useTranslation('cvs');

  const [deleteCv, { loading }] = useDeleteCvSkill(cvId);

  const onSubmit = () => {
    deleteCv({
      variables: { skill: { cvId, name: skillName } },
      onCompleted: () => {
        notify({
          type: 'info',
          title: t('notifications.useDeleteCvSkill.success'),
        });
        onClose();
      },
    });
    onConfirm();
  };

  return (
    <Portal>
      <Dialog.Root
        open={true}
        onOpenChange={(isOpen) => {
          onClose();
          return !isOpen;
        }}
        trapFocus={true}
        motionPreset="scale"
        placement="center"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <ModalContent>
            <ModalHeader>
              <Dialog.Title fontSize="lg" fontWeight="600">
                {t('skills.deleteCvSkillDialog.title')}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <StyledCloseButton />
              </Dialog.CloseTrigger>
            </ModalHeader>

            <Dialog.Body py={4}>
              {t('skills.deleteCvSkillDialog.subTitle')}
              <strong>{skillName}?</strong>
            </Dialog.Body>

            <ModalFooter>
              <CancelButton onClick={onClose}>
                {t('skills.deleteCvSkillDialog.cancelButtonText')}
              </CancelButton>
              <ConfirmButton onClick={onSubmit} disabled={loading}>
                {t('skills.deleteCvSkillDialog.confirmButtonText')}
              </ConfirmButton>
            </ModalFooter>
          </ModalContent>
        </Dialog.Positioner>
      </Dialog.Root>
    </Portal>
  );
};

const useDeleteCvSkillDialog = createDialogHook<DeleteCvSkillDialogProps>(
  (props) => <DeleteCvSkillDialog {...props} />,
);

export default useDeleteCvSkillDialog;
