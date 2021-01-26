import React, {useState} from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectDarkMode } from '../../redux/settings/settings.selectors';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import Form from '../../components/form/form.component';
import './signin.styles.scss';

const SignIn = ({darkMode, googleSignInStart, emailSignInStart}) => {
   const [userCredentials, setUserCredentials] = useState({email: '', password: ''});
   const { email, password } = userCredentials; 

   const handleSubmit = async event => {
      event.preventDefault();
      emailSignInStart(email, password);      
   }

   const handleChange = event => {
      const {name, value} = event.target;
      setUserCredentials({ ...userCredentials, [name]:value });
   }

   return (
      <div style = { darkMode?{color: 'white'}:{color: 'black'}} className = 'sign-in'>
         <span className = "sign-in-title"> Already have an account?</span>
         <span className = "sign-in-text">Sign in with your email and password</span>

         <form className = "content-form" onSubmit = {handleSubmit} style = { darkMode?{backgroundColor: '#d4d1cb'}:{backgroundColor: 'white'}}>
            <Form
               name = "email"
               type = "email"
               value = {email}
               handleChange = {handleChange}
               label = "Email:"
               required 
            />

            <Form
               name = "password"
               type = "password"
               value = {password}
               handleChange = {handleChange}
               label = "Password:"
               required
            />
            <div className = "buttons">
               <button className = "button" type = "submit">
                  Sign&nbsp;In 
               </button>

               <button className = "button-google" type = "button"
                  onClick = {googleSignInStart}
               > 
                  Sign&nbsp;in&nbsp;with&nbsp;Google
               </button>
            </div>
         </form>
      </div>
   )
}

const MapStateToProps = createStructuredSelector({
   darkMode: selectDarkMode
});

const MapDispatchToProps = dispatch => ({
   googleSignInStart: () => dispatch(googleSignInStart()),
   emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(MapStateToProps, MapDispatchToProps)(SignIn);