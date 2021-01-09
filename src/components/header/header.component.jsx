import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDarkMode } from '../../redux/course/course.selectors';

import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import { toggleDarkMode } from '../../redux/course/course.actions';

import "./header.styles.scss";

const Header = ({toggleDarkMode, darkMode}) => {

   const [checked, setChecked] = useState(darkMode);

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

               <div className = "App-btn">
                  <input className = "App-btn-input" 
                         type = "checkbox" id = "toggle-btn" 
                         checked = {checked}
                         onChange = {handleCheckbox}
                  />
                  <label className = "App-btn-label" for = "toggle-btn" />
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
            </div>
         </div>
      );
}

const MapStateToProps = createStructuredSelector({
   darkMode: selectDarkMode
});

const MapDispatchToProps = dispatch => ({
   toggleDarkMode: () => dispatch(toggleDarkMode())
});

export default connect(MapStateToProps, MapDispatchToProps)(Header);
