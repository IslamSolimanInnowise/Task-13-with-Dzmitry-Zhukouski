import { Button } from '@chakra-ui/react';
import Modal from '@entities/ui/Modal/Modal';

interface AddLanguageModalProps {
  userId?: string;
}

const AddLanguageModal: React.FC<AddLanguageModalProps> = ({ userId }) => {
  console.log(userId);

  return (
    <Modal
      titleText="Add Language"
      confirmText="Confirm"
      onConfirm={() => {}}
      trigger={
        <Button w="full" mt="8">
          + ADD Language
        </Button>
      }
    >
      <form>I'm a form</form>
    </Modal>
  );
};

export default AddLanguageModal;
