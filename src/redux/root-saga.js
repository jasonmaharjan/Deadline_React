import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.sagas';

// "all" allows for concurrent sagas to fire 
export default function* rootSaga() {
   yield all([ call(userSagas) ]);
}