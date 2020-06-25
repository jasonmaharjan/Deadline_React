import React from 'react';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';

import "./header.styles.scss";

const Header = () => {
   return (
      <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
               <div className = "App-header-title">
               Deadline Tracker
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

export default Header;
