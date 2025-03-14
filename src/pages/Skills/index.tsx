import Aside from '@entities/ui/Aside';
import { SpinnerContainer } from '@entities/ui/Spinner/spinner.styles';
import useGetSkillCategories from '@features/hooks/users/useGetSkillCategories';
import useGetSkills from '@features/hooks/users/useGetSkills';
import useGetUser from '@features/hooks/users/useGetUser';
import { authVar } from '@shared/store/globalAuthState';
import AddSkillModal from '@widgets/ui/users/AddSkillModal';
import Skill from '@widgets/ui/users/Skill';
import { type Skill as SkillInterface } from '@widgets/ui/users/types';

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

const masteryOptions = [
  'Novice',
  'Advanced',
  'Competent',
  'Proficient',
  'Expert',
];

const SkillsPage: React.FC = () => {
  const { id } = authVar();
  const { data } = useGetUser(id!);
  const userSkills = data?.user.profile.skills;

  const { data: skills, loading: skillLoading } = useGetSkills();
  const { data: categories, loading: categoryLoading } =
    useGetSkillCategories();

  const filteredSkills = skills?.skills?.filter((skill: SkillInterface) => {
    return !userSkills?.some((userSkill: SkillResponse) => {
      return userSkill.name === skill.name;
    });
  });

  const skillsObj = filteredSkills?.reduce(
    (acc: Record<string, SkillInterface[]>, skill: SkillInterface) => {
      const key = skill.category_parent_name ?? skill.category_name;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(skill);
      return acc;
    },
    {},
  );

  return (
    <StyledPageContainer>
      <Aside />
      {skillLoading || categoryLoading ? (
        <SpinnerContainer />
      ) : (
        <StyledPageContent>
          <Styledh2>Skills</Styledh2>
          <AddSkillModal
            userId={id!}
            categories={categories}
            skillsObj={skillsObj}
            masteryOptions={masteryOptions}
          />
          {userSkills?.length !== 0 && (
            <SkillsContainer>
              {userSkills?.map((skill: SkillResponse, i: number) => {
                return (
                  <Skill
                    {...skill}
                    key={i}
                    userId={id!}
                    masteryOptions={masteryOptions}
                    categories={categories}
                  />
                );
              })}
            </SkillsContainer>
          )}
        </StyledPageContent>
      )}
    </StyledPageContainer>
  );
};
export default SkillsPage;
