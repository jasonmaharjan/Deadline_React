import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import CourseReducer from './course/course.reducer';

const persistConfig = {
   key: 'deadline_tracker',
   storage,
   whitelist: ['deadlines'] // as we want 'deadlines' reducer to be persistent
}

const rootReducer = combineReducers ({
   deadlines: CourseReducer 
})

export default persistReducer(persistConfig, rootReducer);