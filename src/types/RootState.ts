// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { LoginPageState } from 'app/pages/Login/slice/types';
import { SignUpPageState } from 'app/pages/SignUp/slice/type';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  login: LoginPageState;
  signup: SignUpPageState;
}
