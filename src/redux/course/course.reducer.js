import { CourseActionTypes } from './course.types';
// import { addDeadline } from './course.utils';
// import { removeDeadline } from './course.utils';
// import { editDeadline } from './course.utils';
import { sortDeadline } from './course.utils';
import { sortDeadlineDND } from './course.utils';

const INITIAL_STATE = {
   deadlines: [],
   sortFlag: false,
   editFlag: false,
   errorMessage: null 
}

const CourseReducer = (state = INITIAL_STATE, action) => {
   switch(action.type) {
      
      case CourseActionTypes.FETCH_DEADLINES_DATA_SUCCESS:
         return {
            ...state, 
            deadlines: action.payload
         }
      
      case CourseActionTypes.FETCH_DEADLINES_DATA_FAILURE:
         return {
            ...state, 
            error: action.payload
         }
         
      case (CourseActionTypes.ADD_DEADLINE_SUCCESS):
         return {
            ...state,
            deadlines: action.payload,
         }

      case (CourseActionTypes.ADD_DEADLINE_FAILURE):
         return {
            ...state,
            error: action.payload
         }

      case (CourseActionTypes.REMOVE_DEADLINE_SUCCESS): 
         return {
            ...state,
            deadlines: action.payload
         }

      case (CourseActionTypes.REMOVE_DEADLINE_FAILURE): 
         return {
            ...state,
            errorMessage: action.payload
         }

      case (CourseActionTypes.REMOVE_DEADLINE_ON_SIGN_OUT): 
         return {
            ...state,
            deadlines: []
         }

      case (CourseActionTypes.EDIT_DEADLINE_SUCCESS): 
         return {
            ...state,
            deadlines: action.payload
         }

      case (CourseActionTypes.EDIT_DEADLINE_FAILURE): 
         return {
            ...state,
            errorMessage: action.payload
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
   
      default: 
         return state;
   }
}

export default CourseReducer;