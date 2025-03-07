import { makeVar } from '@apollo/client';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  id: string | null;
  email: string | null;
}

export const authVar = makeVar<AuthState>({
  accessToken: null,
  refreshToken: null,
  id: null,
  email: null,
});

const initialAuthState: AuthState = {
  accessToken: localStorage.getItem('access-token'),
  refreshToken: localStorage.getItem('refresh-token'),
  id: localStorage.getItem('id'),
  email: localStorage.getItem('email'),
};

authVar(initialAuthState);
