import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from '.';
import { tryLoginApi } from './api';

function* tryLoginSaga(action) {
  const data = action.payload;
  // console.log('data: ', data);

  try {
    const response = yield call(tryLoginApi, data);
    // console.log('response: ', response.data.Token);

    localStorage.setItem('toy_login_token', response.data.Token);

    yield put(actions.tryLoginSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.tryLoginFail());
    }
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.tryLoginRequest.type, tryLoginSaga)]);
}
