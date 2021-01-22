import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import CourseReducer from './course/course.reducer';
import SettingsReducer from './settings/settings.reducer';
import UserReducer from './user/user.reducer';

const persistConfig = {
   key: 'DeadlineTracker',
   storage,
   whitelist: ['deadlines', 'settings'] // as we want 'deadlines' and 'settings' reducers to be persistent
}

const rootReducer = combineReducers ({
   deadlines: CourseReducer,
   settings: SettingsReducer,
   user: UserReducer, 
})

export default persistReducer(persistConfig, rootReducer);