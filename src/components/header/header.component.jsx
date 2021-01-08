import React from 'react';
import { connect } from 'react-redux';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import { toggleDarkMode } from '../../redux/course/course.actions';

import "./header.styles.scss";

const Header = ({toggleDarkMode}) => {
   return (
      <div className="App">
            <header className="App-header">
               <span className = "App-header-span">
                  <img src={logo} className="App-header-span-icon" alt="logo" />
                  <span className = "App-header-span-title">
                     Deadline Tracker
                  </span>
               </span>

               <button className = "App-header-toggle-button" onClick = {toggleDarkMode}>
                     o
               </button>
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

const MapDispatchToProps = dispatch => ({
   toggleDarkMode: () => dispatch(toggleDarkMode())
});

export default connect(null, MapDispatchToProps)(Header);
