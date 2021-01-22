import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectDarkMode } from '../../redux/settings/settings.selectors';

import SignIn from '../../components/signin/signin.component';
import SignUp from '../../components/signup/signup.component';

import './signin_signup.styles.scss';

const SignInSignUp = ({darkMode}) => {
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
   darkMode: selectDarkMode
});


export default connect(MapStateToProps)(SignInSignUp);