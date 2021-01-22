import React, {useState} from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectDarkMode } from '../../redux/settings/settings.selectors';
import { signUpStart } from '../../redux/user/user.actions';

import Form from "../../components/form/form.component";

import './signup.styles.scss';

const SignUp = ({darkMode, signUpStart}) => {
   const [userCredentials, setUserCredentials] = useState({
      Name: '',
      email: '',
      password: '',
      confirmPassword: ''   
   });

   const { Name, email, password, confirmPassword } = userCredentials;

   const handleSubmit = async event => {
      event.preventDefault(); 
      if (password !== confirmPassword) {
         alert('Passwords do not match!');
         return;
      }
      signUpStart({email, password, Name});
   }

   const handleChange= event => {
      const {name, value} = event.target;
      setUserCredentials({ ...userCredentials, [name]:value});
   }

   return (
      <div style = { darkMode?{color: 'white'}:{color: 'black'}} className = 'sign-up'>
         <span className = 'sign-up-title'>Don't have an account?</span>
         <span style = {{fontSize: '1.1rem', marginBottom: '2rem'}}>Sign up with your email and password.</span>

         <form className = "content-form" onSubmit = {handleSubmit} style = { darkMode?{backgroundColor: '#d4d1cb'}:{backgroundColor: 'white'}}>
            <Form
               type = 'text'
               name = 'Name'
               value = {Name}
               onChange = {handleChange}
               label = 'Name:'
               required
            />

            <Form
               type = 'email'
               name = 'email'
               value = {email}
               onChange = {handleChange}
               label = 'Email:'
               required
            />

            <Form 
               type = 'password'
               name = 'password'
               value = {password}
               onChange = {handleChange}
               label = 'Password:'
               required
            /> 

            <Form
               type = 'password'
               name = 'confirmPassword'
               value = {confirmPassword}
               onChange = {handleChange}
               label = 'Confirm it:'
               required
            /> 
            <button className = "button" type = 'submit'>Sign Up</button>
         </form>
      </div>
   )
}
const MapStateToProps = createStructuredSelector({
   darkMode: selectDarkMode
});

const MapDispatchToProps = dispatch => ({
   signUpStart: (signUpData) => dispatch(signUpStart(signUpData))
});

export default connect(MapStateToProps, MapDispatchToProps)(SignUp);