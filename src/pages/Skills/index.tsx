import { Button } from '@chakra-ui/react';
import Aside from '@entities/ui/Aside';
import Modal from '@entities/ui/Modal/Modal';

import {
  Styledh2,
  StyledPageContainer,
  StyledPageContent,
} from './skills.styles';

const SkillsPage: React.FC = () => {
  return (
    <StyledPageContainer>
      <Aside />
      <StyledPageContent>
        <Styledh2>Skills</Styledh2>
        <Modal
          confirmText="Confirm"
          onConfirm={() => {}}
          trigger={
            <Button w="full" mt="8">
              + ADD SKILL
            </Button>
          }
        >
          Children
        </Modal>
      </StyledPageContent>
    </StyledPageContainer>
  );
};
export default SkillsPage;
