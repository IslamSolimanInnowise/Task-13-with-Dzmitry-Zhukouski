import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '@shared/queries/cvs/getProjects';

const useGetProjects = () => {
  return useQuery(GET_PROJECTS);
};

export default useGetProjects;
