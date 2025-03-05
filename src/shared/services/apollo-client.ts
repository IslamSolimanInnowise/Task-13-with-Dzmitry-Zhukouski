import { onError } from '@apollo/client/link/error';
import { notify } from '@app/Notifications/notify';
// import useUpdateToken from '@widgets/hooks/auth/useUpdateToken';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // const [updateToken] = useUpdateToken();

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      notify({
        type: 'error',
        title: 'Error',
        message,
      });

      if (message === 'Unauthorized') {
        // updateToken();
        console.log('unauthorized');
      }
    });
  }

  if (networkError) {
    notify({
      type: 'error',
      title: 'Error',
      message: networkError.message,
    });
  }
});

export default errorLink;
