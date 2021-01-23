import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectDarkMode } from '../../redux/settings/settings.selectors';
import { toggleDarkMode } from '../../redux/settings/settings.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import logo from '../../logo.svg';
import "./header.styles.scss";

const Header = ({currentUser, toggleDarkMode, darkMode, signOutStart}) => {

   const [checked, setChecked] = useState(darkMode);
   const defaultPhoto = "https://nanocohybri.inc.uam.es/wp-content/uploads/2017/11/icon-user-default.png";

   const handleCheckbox = () => {
      setChecked(!checked)
      toggleDarkMode();
   }
   return (
      <div className="App">
            <header className="App-header">
               <span className = "App-header-span">
                  <img src={logo} className="App-header-span-icon" alt="logo" />
                  <span className = "App-header-span-title">
                     Deadline Tracker
                  </span>
               </span>

               <div className = "App-header-div">
                  <div className = "App-btn">
                     <input className = "App-btn-input" 
                           type = "checkbox" id = "toggle-btn" 
                           checked = {checked}
                           onChange = {handleCheckbox}
                     />
                     <label className = "App-btn-label" htmlFor = "toggle-btn" />
                  </div>
                  {
                     currentUser ?
                        currentUser.photoURL ?
                              <img src = {currentUser.photoURL} alt = "User" className = "user-photo"></img>
                        :
                              <img src = {defaultPhoto} alt = "default" className = "user-photo"></img>
                     :
                     null
                  }
               </div>
            </header>

            <div className = "route">
               <Link className  = "route-name" to = "/">
                  Home
               </Link>
               <Link className  = "route-name" to = "/set_deadline">
                  Set Deadline
               </Link>
               <Link className  = "route-name" to = "/view_deadline">
                  View Deadlines
               </Link>
               {
                  currentUser? 
                     <div className  = "route-name" onClick = {signOutStart}>
                        Sign Out
                     </div>
                  :
                     <Link className  = "route-name" to = "/signin_signup">
                        Sign In
                     </Link>
               }
            </div>
         </div>
      );
}

const MapStateToProps = createStructuredSelector({
   darkMode: selectDarkMode,
   currentUser: selectCurrentUser
});

const MapDispatchToProps = dispatch => ({
   toggleDarkMode: () => dispatch(toggleDarkMode()),
   signOutStart: () => dispatch(signOutStart())
});

export default connect(MapStateToProps, MapDispatchToProps)(Header);
