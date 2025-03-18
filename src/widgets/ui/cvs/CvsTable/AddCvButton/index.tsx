import { Icon } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { StyledAddCvButton } from './addCvButton.styles';
import useCreateCvDialog from './CreateCvDialog';

const AddCvButton = () => {
  const { t } = useTranslation('CVsTable');
  const [openCreateCvDialog] = useCreateCvDialog();

  return (
    <StyledAddCvButton
      variant="ghost"
      onClick={() =>
        openCreateCvDialog({
          onConfirm: () => {},
        })
      }
    >
      <Icon as={Plus} w={5} h={5} />
      {t('createCvButtonText')}
    </StyledAddCvButton>
  );
};

export default AddCvButton;
