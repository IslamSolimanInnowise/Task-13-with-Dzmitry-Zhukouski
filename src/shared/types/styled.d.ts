import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: string;
    color: string;
    primaryColor: string;
    darkPrimaryColor: string;
    lightGrey: string;
    grey: string;
  }
}
