import { useMutation } from '@apollo/client';
import { GET_CVS } from '@shared/queries/cvs/getCvs';
import { UPDATE_CV } from '@shared/queries/cvs/updateCv';

const useUpdateCv = () => {
  return useMutation(UPDATE_CV, {
    refetchQueries: [{ query: GET_CVS }],
  });
};

export default useUpdateCv;
