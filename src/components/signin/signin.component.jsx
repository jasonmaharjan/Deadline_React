import React, {useState} from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectDarkMode } from '../../redux/settings/settings.selectors';

import Form from '../../components/form/form.component';
import './signin.styles.scss';

const SignIn = ({darkMode}) => {
   const [userCredentials, setUserCredentials] = useState({email: '', password: ''});
   const { email, password } = userCredentials; 

   const handleSubmit = async event => {
      event.preventDefault();
      //emailSignInStart(email, password);      
   }

   const handleChange = event => {
      const {name, value} = event.target;
      setUserCredentials({ ...userCredentials, [name]:value });
   }

   return (
      <div style = { darkMode?{color: 'white'}:{color: 'black'}} className = 'sign-in'>
         <span className = "sign-in-title"> Already have an account?</span>
         <span style = {{fontSize: '1.1rem', marginBottom: '1rem'}}>Sign in with your email and password</span>

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
                  Sign In 
               </button>

               <button className = "button-google" type = "button"
                  /*onClick = {googleSignInStart}*/
                  isGoogleSignIn>
                  {' '}
                  Sign in with Google {' '}
               </button>
            </div>

         </form>
      </div>
   )
}

const MapStateToProps = createStructuredSelector({
   darkMode: selectDarkMode
});

export default connect(MapStateToProps)(SignIn);