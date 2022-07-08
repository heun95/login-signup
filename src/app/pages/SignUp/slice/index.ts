import { createSlice } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { SignUpData, SignUpPageState } from './type';
import saga from './saga';

export const initialState: SignUpPageState = {
  loading: false,
  isSuccess: false,
  isError: false,
  data: null,
};

export const slice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    trySignUpRequest(state, action) {
      state.loading = true;
    },
    trySignUpSuccess(state, action) {
      state.loading = false;
      state.isSuccess = true;
    },
    trySignUpFail(state) {
      state.loading = false;
      state.isSuccess = false;
      state.isError = true;
    },
    signUpStateClear(state) {
      state.isSuccess = false;
      state.isError = false;
    },
  },
});

export const { actions, reducer } = slice;

export const useSignUpSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga });
  return {
    actions: slice.actions,
  };
};
