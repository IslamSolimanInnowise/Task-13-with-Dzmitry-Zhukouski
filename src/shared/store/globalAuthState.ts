import { makeVar } from '@apollo/client';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  id: string | null;
}

export const authVar = makeVar<AuthState>({
  accessToken: null,
  refreshToken: null,
  id: null,
});

const initialAuthState: AuthState = {
  accessToken: localStorage.getItem('access-token'),
  refreshToken: localStorage.getItem('refresh-token'),
  id: localStorage.getItem('id'),
};

authVar(initialAuthState);
