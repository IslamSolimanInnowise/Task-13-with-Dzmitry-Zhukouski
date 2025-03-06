import { makeVar } from '@apollo/client';

export interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  id: string | null;
}

export const authVar = makeVar<AuthState>({
  access_token: null,
  refresh_token: null,
  id: null,
});

const initialAuthState: AuthState = {
  access_token: localStorage.getItem('access-token'),
  refresh_token: localStorage.getItem('refresh-token'),
  id: localStorage.getItem('id'),
};

authVar(initialAuthState);
