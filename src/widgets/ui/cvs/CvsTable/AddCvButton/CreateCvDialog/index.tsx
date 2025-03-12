import { Dialog, Portal, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDialogHook } from '@shared/Dialogs/createDialogHook';
import { Field } from '@shared/ui/field';
import { useForm } from 'react-hook-form';
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

const schema = z.object({
  name: z.string().min(1, { message: 'Required field' }),
  education: z.string().optional(),
  description: z.string().min(1, { message: 'Required field' }),
});

type FormData = z.infer<typeof schema>;

type ConfirmationDialogProps = {
  onClose: () => void;
  onConfirm: (data: FormData) => void;
};

const CreateCvDialog = ({ onClose, onConfirm }: ConfirmationDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const watchFields = watch();
  const isDisabled = !Object.values(watchFields).some((value) => value?.trim());

  const onSubmit = (data: FormData) => {
    onConfirm(data);
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
                Create CV
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <StyledCloseButton />
              </Dialog.CloseTrigger>
            </ModalHeader>

            <Dialog.Body py={4}>
              <VStack as="form" gap={8} onSubmit={handleSubmit(onSubmit)}>
                <Field errorText={errors.name?.message} invalid={!!errors.name}>
                  <StyledInput {...register('name')} placeholder="Name" />
                </Field>
                <StyledInput
                  {...register('education')}
                  placeholder="Education"
                />
                <Field
                  errorText={errors.description?.message}
                  invalid={!!errors.description}
                >
                  <StyledTextArea
                    {...register('description')}
                    placeholder="Description"
                    rows={4}
                    resize="none"
                  />
                </Field>
              </VStack>
            </Dialog.Body>

            <ModalFooter>
              <CancelButton onClick={onClose}>Cancel</CancelButton>
              <ConfirmButton
                onClick={handleSubmit(onConfirm)}
                disabled={isDisabled || isSubmitting}
              >
                Create
              </ConfirmButton>
            </ModalFooter>
          </ModalContent>
        </Dialog.Positioner>
      </Dialog.Root>
    </Portal>
  );
};

const useCreateCvDialog = createDialogHook<ConfirmationDialogProps>((props) => (
  <CreateCvDialog {...props} />
));

export default useCreateCvDialog;
