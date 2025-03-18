import { useQuery } from '@apollo/client';
import { GET_SKILL_CATEGORIES } from '@shared/queries/users/getSkillCategories';

const useGetSkillCategories = () => {
  return useQuery(GET_SKILL_CATEGORIES);
};

export default useGetSkillCategories;
