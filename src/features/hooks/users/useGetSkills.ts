import { useQuery } from '@apollo/client';
import { GET_SKILLS } from '@shared/queries/users/getSkills';

const useGetSkills = () => {
  return useQuery(GET_SKILLS);
};

export default useGetSkills;
