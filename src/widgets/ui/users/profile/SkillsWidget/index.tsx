import { Text } from '@chakra-ui/react';
import Spinner from '@entities/ui/Spinner';
import useGetSkillCategories from '@features/hooks/users/useGetSkillCategories';
import useGetSkills from '@features/hooks/users/useGetSkills';
import useGetUser from '@features/hooks/users/useGetUser';
import { authVar } from '@shared/store/globalAuthState';
import { type Skill as SkillInterface } from '@widgets/ui/users/types';
import { Trans, useTranslation } from 'react-i18next';

import AddSkillModal from '../../AddSkillModal';
import Skill from '../../Skill';
import { SkillsContainer } from './skillsWidget.styles';

interface SkillResponse {
  mastery: string;
  name: string;
}

interface SkillsWidgetProps {
  userId: string;
}

const masteryOptions = [
  'Novice',
  'Advanced',
  'Competent',
  'Proficient',
  'Expert',
];

const SkillsWidget: React.FC<SkillsWidgetProps> = ({ userId }) => {
  const { t } = useTranslation('users');
  const { id } = authVar();
  const { data } = useGetUser(userId);
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

  return skillLoading || categoryLoading ? (
    <Spinner />
  ) : (
    <>
      {userId === id && (
        <AddSkillModal
          userId={id!}
          categories={categories}
          skillsObj={skillsObj}
          masteryOptions={masteryOptions}
        />
      )}
      {userSkills?.length !== 0 && (
        <SkillsContainer>
          <Text>
            <Trans
              i18nKey="skills.skill.skillCount"
              count={userSkills?.length}
              t={t}
              components={{ b: <b /> }}
            />
          </Text>
          {userSkills?.map((skill: SkillResponse) => {
            return (
              <Skill
                {...skill}
                key={skill.name}
                userId={userId}
                masteryOptions={masteryOptions}
                categories={categories}
              />
            );
          })}
        </SkillsContainer>
      )}
    </>
  );
};
export default SkillsWidget;
