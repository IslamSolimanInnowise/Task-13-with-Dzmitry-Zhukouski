import { makeVar } from '@apollo/client';

export interface AuthState {
  token: string | null;
  id: string | null;
}

export const authVar = makeVar<AuthState>({
  token: null,
  id: null,
});

const initialAuthState: AuthState = {
  token: localStorage.getItem('token'),
  id: localStorage.getItem('id'),
};

authVar(initialAuthState);
