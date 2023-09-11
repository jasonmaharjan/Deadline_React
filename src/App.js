import React, { useEffect } from 'react';
import {compose} from 'redux'; // for easier readability for connect() of HOCs
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import { selectDarkMode } from './redux/settings/settings.selectors';

import { checkUserSession } from './redux/user/user.actions';

import { selectCurrentUser } from './redux/user/user.selectors';
import { selectIsUserFetching } from './redux/user/user.selectors';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SetDeadline from './pages/setdeadline/setdeadline.component';
import ViewDeadlinePage from './pages/viewdeadline/viewdeadlinepage.component';
import SignInSignUp from './pages/signin_signup/signin_signup.component';

import WithSpinner from './components/with-spinner/with-spinner.component';

// import axios from 'axios'; 

import './App.scss';

const App = ({ checkUserSession, currentUser }) => {

  useEffect(()=> {
    checkUserSession();
  }, [checkUserSession]);
  
  const ComposedRoute = (route) => (
    compose(connect(mapStateToProps),WithSpinner)(route)
  );

  return (
    <div className = "App-main">
      <Header />
      <Switch>
        <Route exact path = "/" component = {ComposedRoute(HomePage)} />
        <Route path = "/set_deadline" component = {ComposedRoute(SetDeadline)} />
        <Route path = "/view_deadline" component = {ComposedRoute(ViewDeadlinePage)} />
        <Route exact path = "/signin_signup" 
          render = {() => 
            currentUser ?
            <Redirect to = "/" />
            : 
            <SignInSignUp />
          } 
        />
      </Switch>
    </div>
  );
}

// For redirecting
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectIsUserFetching,
  darkMode: selectDarkMode
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
