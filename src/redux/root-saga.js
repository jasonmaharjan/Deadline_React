import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.sagas';
import { courseSagas } from './course/course.sagas';

// "all" allows for concurrent sagas to fire 
export default function* rootSaga() {
   yield all([ call(userSagas), call(courseSagas) ]);
}