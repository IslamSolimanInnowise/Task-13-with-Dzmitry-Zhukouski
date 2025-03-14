import { useQuery } from '@apollo/client';
import { GET_LANGUAGES } from '@shared/queries/users/getLanguages';

const useGetLanguages = () => {
  return useQuery(GET_LANGUAGES);
};

export default useGetLanguages;
