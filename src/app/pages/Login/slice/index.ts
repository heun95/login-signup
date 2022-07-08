/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { LoginData, LoginPageState } from './types';
import saga from './saga';

const initialState: LoginPageState = {
  loading: false,
  isSuccess: false,
  isError: false,
  data: null,
};

export const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    tryLoginRequest(state, _action: PayloadAction<LoginData>) {
      state.loading = true;
    },
    tryLoginSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.isSuccess = true;
    },
    tryLoginFail(state) {
      state.loading = false;
      state.isSuccess = false;
      state.isError = true;
    },
    loginStateClear(state) {
      state.isError = false;
    },
  },
});

export const { actions, reducer } = slice;

export const useLoginSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga });
  return {
    actions: slice.actions,
  };
};
