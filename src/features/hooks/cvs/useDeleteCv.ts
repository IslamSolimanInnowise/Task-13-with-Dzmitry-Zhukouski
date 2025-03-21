import { useMutation } from '@apollo/client';
import { DELETE_CV } from '@shared/queries/cvs/deleteCv';
import { GET_CVS } from '@shared/queries/cvs/getCvs';

const useDeleteCv = () => {
  return useMutation(DELETE_CV, {
    refetchQueries: [{ query: GET_CVS }],
  });
};

export default useDeleteCv;
