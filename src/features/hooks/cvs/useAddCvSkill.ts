import { useMutation } from '@apollo/client';
import { ADD_CV_SKILL } from '@shared/queries/cvs/addCvSkill';
import { GET_CV_BY_ID } from '@shared/queries/cvs/getCvById';

const useAddCvSkill = (cvId: string) => {
  return useMutation(ADD_CV_SKILL, {
    refetchQueries: [{ query: GET_CV_BY_ID, variables: { cvId } }],
  });
};

export default useAddCvSkill;
