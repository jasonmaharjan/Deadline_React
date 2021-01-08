import { CourseActionTypes } from './course.types';
import { addDeadline } from './course.utils';
import { removeDeadline } from './course.utils';
import { editDeadline } from './course.utils';
import { sortDeadline } from './course.utils';
import { sortDeadlineDND } from './course.utils';

const INITIAL_STATE = {
   deadlines: [],
   settings: { 
      redWarn: 86400,          // by default 1 day
      yellowWarn: 259200,      // by default 3 days
   },
   sortFlag: false,
   editFlag: false,
   settingsFlag: false,
   darkMode: false,
}

const CourseReducer = (state = INITIAL_STATE, action) => {
   switch(action.type) {

      case (CourseActionTypes.ADD_DEADLINE):
         return {
            ...state,
            deadlines: addDeadline(state.deadlines, action.payload)
         }

      case (CourseActionTypes.REMOVE_DEADLINE): 
         return {
            ...state,
            deadlines: removeDeadline(state.deadlines, action.payload)
         }

      case (CourseActionTypes.EDIT_DEADLINE): 
         return {
            ...state,
            deadlines: editDeadline(state.deadlines, action.payload)
         }
      
      case (CourseActionTypes.TOGGLE_SORT):
         return {
            ...state,
            sortFlag: !state.sortFlag
         }
      
      case (CourseActionTypes.TOGGLE_EDIT):
         return {
            ...state,
            editFlag: !state.editFlag
         }
      
      case (CourseActionTypes.TOGGLE_SETTINGS):
         return {
            ...state,
            settingsFlag: !state.settingsFlag
         }
         
      case (CourseActionTypes.SORT_DEADLINE):
         return {
            ...state,
            deadlines: sortDeadline(state.deadlines, state.sortFlag),
         }

      case (CourseActionTypes.SORT_DEADLINE_DND):
         return {
            ...state,
            deadlines: sortDeadlineDND(state.deadlines, action.payload),
         }

      case (CourseActionTypes.EDIT_SETTINGS): 
         return {
            ...state,
            settings: action.payload
         }

      case (CourseActionTypes.TOGGLE_DARK_MODE):
         return {
            ...state,
            darkMode: !state.darkMode
         }
   
      default: 
         return state;
   }
}

export default CourseReducer;