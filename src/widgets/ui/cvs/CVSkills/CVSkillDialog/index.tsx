import { Dialog, Portal } from '@chakra-ui/react';
import useAddCvSkill from '@features/hooks/cvs/useAddCvSkill';
import useUpdateCvSkill from '@features/hooks/cvs/useUpdateCvSkill';
import useGetSkills from '@features/hooks/users/useGetSkills';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDialogHook } from '@shared/Dialogs';
import { Cv, Skill, SkillMastery } from 'cv-graphql';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import {
  CancelButton,
  ConfirmButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  StyledCloseButton,
} from './cvSkillDialog.styles';
import CVSkillDialogForm from './CVSkillDialogForm';

type CVSkillDialogProps = {
  cvId: Cv['id'];
  cvSkills: SkillMastery[];
  updatingMode?: boolean;
  updatingSkill?: SkillMastery;
  onClose: () => void;
  onConfirm: () => void;
};

const schema = z.object({
  skillName: z.string().min(1),
  mastery: z.enum([
    'Novice',
    'Advanced',
    'Competent',
    'Proficient',
    'Expert',
  ]) as z.ZodType<SkillMastery['mastery']>,
});

type FormValues = z.infer<typeof schema>;

const CVSkillDialog: React.FC<CVSkillDialogProps> = ({
  cvId,
  cvSkills,
  updatingMode = false,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation('cvs');

  const { data: skills, loading: skillLoading } = useGetSkills();

  const [addCvSkill] = useAddCvSkill(onClose, cvId);
  const [updateCvSkill] = useUpdateCvSkill(onClose, cvId);

  const filteredSkills = updatingMode
    ? skills?.skills?.filter((skill: Skill) => skill.name === cvSkills[0].name)
    : skills?.skills?.filter((skill: Skill) => {
        return !cvSkills?.some((userSkill: SkillMastery) => {
          return userSkill.name === skill.name;
        });
      });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      skillName: updatingMode ? cvSkills[0].name : undefined,
      mastery: updatingMode ? cvSkills[0].mastery : undefined,
    },
  });

  const onSubmit = handleSubmit((data) => {
    const categoryId = skills.skills.find(
      (skill: Skill) => skill.name === data.skillName,
    )?.category.id;

    if (updatingMode) {
      updateCvSkill({
        variables: {
          skill: {
            cvId,
            name: data.skillName,
            categoryId,
            mastery: data.mastery,
          },
        },
      });
    } else {
      addCvSkill({
        variables: {
          skill: {
            cvId,
            name: data.skillName,
            categoryId,
            mastery: data.mastery,
          },
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
        size="md"
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <ModalContent>
            <ModalHeader>
              <Dialog.Title fontSize="lg" fontWeight="600">
                {updatingMode
                  ? t('skills.updateCVSkillDialog.title')
                  : t('skills.addCVSkillDialog.title')}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <StyledCloseButton />
              </Dialog.CloseTrigger>
            </ModalHeader>
            <Dialog.Body py={4}>
              <CVSkillDialogForm
                control={control}
                filteredSkills={filteredSkills}
                skillLoading={skillLoading}
                updatingMode={updatingMode}
              />
            </Dialog.Body>
            <ModalFooter>
              <CancelButton onClick={onClose}>
                {t('skills.addCVSkillDialog.cancelButtonText')}
              </CancelButton>
              <ConfirmButton
                onClick={onSubmit}
                disabled={!isValid || skillLoading}
              >
                {updatingMode
                  ? t('skills.updateCVSkillDialog.confirmButtonText')
                  : t('skills.addCVSkillDialog.confirmButtonText')}
              </ConfirmButton>
            </ModalFooter>
          </ModalContent>
        </Dialog.Positioner>
      </Dialog.Root>
    </Portal>
  );
};

const useCVSkillDialog = createDialogHook<CVSkillDialogProps>((props) => (
  <CVSkillDialog {...props} />
));
export default useCVSkillDialog;
