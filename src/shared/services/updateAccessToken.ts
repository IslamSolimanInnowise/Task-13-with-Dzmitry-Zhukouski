import { UPDATE_TOKEN } from '@features/auth/updateToken';

import client from './apollo-client';

const updateAccessToken = async () => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_TOKEN,
    });
    console.log(response);
    // return response.data.updateToken.access_token;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export default updateAccessToken;
