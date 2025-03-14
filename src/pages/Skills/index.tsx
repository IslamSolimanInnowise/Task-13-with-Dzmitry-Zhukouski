import Aside from '@entities/ui/Aside';
import useGetUser from '@features/hooks/users/useGetUser';
import { authVar } from '@shared/store/globalAuthState';
import AddSkillModal from '@widgets/ui/users/AddSkillModal';
import Skill from '@widgets/ui/users/Skill';

import {
  SkillsContainer,
  Styledh2,
  StyledPageContainer,
  StyledPageContent,
} from './skills.styles';

interface SkillResponse {
  mastery: string;
  name: string;
}

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
        <SkillsContainer>
          {userSkills?.map((skill: SkillResponse, i: number) => {
            return <Skill {...skill} key={i} userId={id!} />;
          })}
        </SkillsContainer>
      </StyledPageContent>
    </StyledPageContainer>
  );
};
export default SkillsPage;
