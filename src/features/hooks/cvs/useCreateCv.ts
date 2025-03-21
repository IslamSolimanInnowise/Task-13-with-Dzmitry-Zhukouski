import { useMutation } from '@apollo/client';
import { CREATE_CV } from '@shared/queries/cvs/createCv';
import { GET_CVS } from '@shared/queries/cvs/getCvs';

const useCreateCv = () => {
  return useMutation(CREATE_CV, {
    refetchQueries: [{ query: GET_CVS }],
  });
};

export default useCreateCv;
