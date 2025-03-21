import { useMutation } from '@apollo/client';
import { DELETE_CV_SKILL } from '@shared/queries/cvs/deleteCvSkill';
import { GET_CV_BY_ID } from '@shared/queries/cvs/getCvById';

const useDeleteCvSkill = (cvId: string) => {
  return useMutation(DELETE_CV_SKILL, {
    refetchQueries: [{ query: GET_CV_BY_ID, variables: { cvId } }],
  });
};

export default useDeleteCvSkill;
