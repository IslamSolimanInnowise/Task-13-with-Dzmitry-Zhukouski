import Aside from '@entities/ui/Aside';
import useGetUser from '@features/hooks/users/useGetUser';
import { authVar } from '@shared/store/globalAuthState';
import AddSkillModal from '@widgets/ui/users/AddSkillModal';

import {
  Styledh2,
  StyledPageContainer,
  StyledPageContent,
} from './skills.styles';

const SkillsPage: React.FC = () => {
  const { id } = authVar();
  const { data } = useGetUser(id!);
  console.log(data);
  const userSkills = data?.user.profile.skills;

  return (
    <StyledPageContainer>
      <Aside />
      <StyledPageContent>
        <Styledh2>Skills</Styledh2>
        <AddSkillModal userId={id!} />
      </StyledPageContent>
    </StyledPageContainer>
  );
};
export default SkillsPage;
