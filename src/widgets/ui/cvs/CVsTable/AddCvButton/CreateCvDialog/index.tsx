import { useReactiveVar } from '@apollo/client';
import { Dialog, Portal, VStack } from '@chakra-ui/react';
import useCreateCv from '@features/hooks/cvs/useCreateCv';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDialogHook } from '@shared/Dialogs/createDialogHook';
import { authVar } from '@shared/store/globalAuthState';
import { Field } from '@shared/ui/field';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
} from './createCvDialog.styled';

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

type CreateCvDialogProps = {
  onClose: () => void;
  onConfirm: () => void;
};

type CV = {
  name: string;
  description: string;
  education?: string | undefined;
  userId: string | null;
};

const CreateCvDialog = ({ onClose, onConfirm }: CreateCvDialogProps) => {
  const { t } = useTranslation('cvs');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const [createCv, { loading }] = useCreateCv(onClose);

  const { id } = useReactiveVar(authVar);

  const onSubmit = handleSubmit((data) => {
    const cvData: CV = {
      ...data,
      userId: id,
    };
    createCv({ variables: { cv: cvData } });
    onConfirm();
  });

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
                {t('table.createCvDialog.title')}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <StyledCloseButton />
              </Dialog.CloseTrigger>
            </ModalHeader>

            <Dialog.Body py={4}>
              <VStack as="form" gap={8}>
                <Field
                  errorText={t('table.createCvDialog.requiredError')}
                  invalid={!!errors.name}
                >
                  <StyledInput
                    {...register('name')}
                    placeholder={t('table.createCvDialog.nameInputPlaceholder')}
                  />
                </Field>
                <StyledInput
                  {...register('education')}
                  placeholder={t(
                    'table.createCvDialog.educationInputPlaceholder',
                  )}
                />
                <Field
                  errorText={t('table.createCvDialog.requiredError')}
                  invalid={!!errors.description}
                >
                  <StyledTextArea
                    {...register('description')}
                    placeholder={t(
                      'table.createCvDialog.descriptionInputPlaceholder',
                    )}
                    rows={4}
                    resize="none"
                  />
                </Field>
              </VStack>
            </Dialog.Body>

            <ModalFooter>
              <CancelButton onClick={onClose}>
                {t('table.createCvDialog.cancelButtonText')}
              </CancelButton>
              <ConfirmButton
                onClick={onSubmit}
                disabled={!isValid || isSubmitting || loading}
              >
                {t('table.createCvDialog.confirmButtonText')}
              </ConfirmButton>
            </ModalFooter>
          </ModalContent>
        </Dialog.Positioner>
      </Dialog.Root>
    </Portal>
  );
};

const useCreateCvDialog = createDialogHook<CreateCvDialogProps>((props) => (
  <CreateCvDialog {...props} />
));

export default useCreateCvDialog;
