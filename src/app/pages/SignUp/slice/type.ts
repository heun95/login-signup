export interface SignUpData {
  username: string;
  email: string;
  phone_number: string;
  name: string;
  password: string;
  confirm: string;
  user_group: string;
}

export interface SignUpPageState {
  loading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: SignUpData | null;
}
