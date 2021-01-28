// Actions for redux sagas!
import { UserActionTypes } from './user.types';

// Action to check user persist
export const checkUserSession = () => ({
   type: UserActionTypes.CHECK_USER_SESSION
});

// Action to falsify userFetching value
export const noUserAuth = () => ({
   type: UserActionTypes.NO_USER_AUTH
});


// sign in actions
export const googleSignInStart = () => ({
   type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = (emailAndPassword) => ({
   type: UserActionTypes.EMAIL_SIGN_IN_START,
   payload: emailAndPassword
});

export const signInSuccess = (user) => ({
   type: UserActionTypes.SIGN_IN_SUCCESS,
   payload: user
});

export const signInFailure = (error) => ({
   type: UserActionTypes.SIGN_IN_FAILURE,
   payload: error
});

// sign out actions
export const signOutStart = () => ({
   type: UserActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
   type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (error) => ({
   type: UserActionTypes.SIGN_OUT_FAILURE,
   payload: error
})

// sign Up actions
export const signUpStart = (signUpData) => ({
   type: UserActionTypes.SIGN_UP_START,
   payload: signUpData
})

export const signUpSuccess = ({user, additionalData}) => ({
   type: UserActionTypes.SIGN_UP_SUCCESS,
   payload: {user, additionalData}
})

export const signUpFailure = (error) => ({
   type: UserActionTypes.SIGN_UP_FAILURE,
   payload: error
})
