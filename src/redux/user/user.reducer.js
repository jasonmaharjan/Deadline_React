import {UserActionTypes} from './user.types';

const INITIAL_STATE = {
   currentUser: null,
   error: null,
   isUserFetching: false,
}

const userReducer = (state = INITIAL_STATE, action) => {
   switch(action.type) {

      case UserActionTypes.EMAIL_SIGN_IN_START: 
         return {
            ...state,
            isUserFetching: true,
      };

      case UserActionTypes.GOOGLE_SIGN_IN_START: 
         return {
            ...state,
            isUserFetching: true,
      };

      case UserActionTypes.CHECK_USER_SESSION: 
         return {
            ...state,
            isUserFetching: true,
      };

      case UserActionTypes.NO_USER_AUTH: 
         return {
            ...state,
            isUserFetching: false,
      };

      case UserActionTypes.SIGN_IN_SUCCESS: 
         return {
            ...state,
            currentUser: action.payload,
            error: null,
            isUserFetching: false,
         };

      case UserActionTypes.SIGN_OUT_SUCCESS: 
         return {
            ...state,
            currentUser: null,
            error: null
         };

      case UserActionTypes.SIGN_IN_FAILURE:  
      case UserActionTypes.SIGN_OUT_FAILURE:  
      case UserActionTypes.SIGN_UP_FAILURE:
         return {
            ...state,
            error: action.payload,
            isUserFetching: false,
         };

      default: 
         return state;    
   }
}

export default userReducer;