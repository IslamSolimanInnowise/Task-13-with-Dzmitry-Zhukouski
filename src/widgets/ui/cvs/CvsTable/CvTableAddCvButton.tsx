import { Icon } from '@chakra-ui/react';
import { Plus } from 'lucide-react';

import { StyledAddCvButton } from './cvsTable.styles';

const CvTableAddCvButton = () => {
  return (
    <StyledAddCvButton variant="ghost">
      <Icon as={Plus} w={5} h={5} />
      Create CV
    </StyledAddCvButton>
  );
};

export default CvTableAddCvButton;
