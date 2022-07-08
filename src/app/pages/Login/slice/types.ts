export interface LoginData {
  email: string;
  password: string;
}

export interface LoginPageState {
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: LoginData | null;
}
