import { makeVar } from '@apollo/client';

export type ThemeMode = 'light' | 'dark';

export const themeVar = makeVar<ThemeMode>(
  (localStorage.getItem('theme') as ThemeMode) || 'light',
);

export const setTheme = (theme: ThemeMode) => {
  localStorage.setItem('theme', theme);
  themeVar(theme);
};

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
