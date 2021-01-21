import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SetDeadline from './pages/setdeadline/setdeadline.component';
import ViewDeadline from './pages/viewdeadline/viewdeadline.component';
import SignInSignUp from './pages/signin_signup/signin_signup.component';

function App() {
  return (
    <div className = "App-main">
      <Header />
      <Switch>
        <Route exact path = "/" component = {HomePage} />
        <Route path = "/set_deadline" component = {SetDeadline} />
        <Route path = "/view_deadline" component = {ViewDeadline} />
        <Route path = "/signin_signup" component = {SignInSignUp} />
      </Switch>
    </div>
  );
}

export default App;
