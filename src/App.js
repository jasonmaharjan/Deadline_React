import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SetDeadline from './pages/setdeadline/setdeadline.component';
import ViewDeadline from './pages/viewdeadline/viewdeadline.component';
import SignInSignUp from './pages/signin_signup/signin_signup.component';

import './App.scss';

const App = ({ checkUserSession, currentUser }) => {

  useEffect(()=> {
    checkUserSession();
  }, [checkUserSession]);
  
  return (
    <div className = "App-main">
      <Header />
      <Switch>
        <Route exact path = "/" component = {HomePage} />
        <Route path = "/set_deadline" component = {SetDeadline} />
        <Route path = "/view_deadline" component = {ViewDeadline} />
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
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
