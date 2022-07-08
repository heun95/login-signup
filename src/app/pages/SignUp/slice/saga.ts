import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from '.';
import { trySignUpApi } from './api';

function* trySignUpSaga(action) {
  const data = action.payload;
  // console.log('data: ', data);

  try {
    // throw new Error('error');
    const response = yield call(trySignUpApi, data);

    yield put(actions.trySignUpSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      // console.log(error);
      yield put(actions.trySignUpFail());
    }
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.trySignUpRequest.type, trySignUpSaga)]);
}
