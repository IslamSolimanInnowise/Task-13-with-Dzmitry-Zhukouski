import { useMutation } from '@apollo/client';
import { GET_CV_BY_ID } from '@shared/queries/cvs/getCvById';
import { UPDATE_CV_SKILL } from '@shared/queries/cvs/updateCvSkill';

const useUpdateCvSkill = (cvId: string) => {
  return useMutation(UPDATE_CV_SKILL, {
    refetchQueries: [{ query: GET_CV_BY_ID, variables: { cvId } }],
  });
};

export default useUpdateCvSkill;
