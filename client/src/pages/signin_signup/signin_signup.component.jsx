import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectDarkMode } from '../../redux/settings/settings.selectors';
import { selectError } from '../../redux/user/user.selectors';
import { resetError } from '../../redux/user/user.actions';

import SignIn from '../../components/signin/signin.component';
import SignUp from '../../components/signup/signup.component';
import { Notification } from '../../components/notification/notification';

import './signin_signup.styles.scss';

const SignInSignUp = ({darkMode, error, resetError}) => {
   useEffect(() => {
      if (error) {
         Notification('error', error.code, error.message);
         resetError();
      }
   },[error, resetError]);

   return (
      <div className = {`${darkMode ? 'signin-dark' : 'signin'}`}>
            <div  className = "signin-signup">
               <SignIn />
               <SignUp />
            </div>
      </div>
   );
}

const MapStateToProps = createStructuredSelector({
   darkMode: selectDarkMode,
   error: selectError
});

const MapDispatchToProps = dispatch => ({
   resetError: () => dispatch(resetError())
});

export default connect(MapStateToProps, MapDispatchToProps)(SignInSignUp);