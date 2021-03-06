import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';
import {logoutUser} from './actions/authActions';
import {clearCurrentProfile} from './actions/profileActions';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/navbar/Nav';
import Section from './components/layout/SectionOne';
import FooterBar from './components/layout/FooterBar';
import Index from './components/layout/Index';
import Regist from './components/auth/Regist';
import Login from './components/auth/Login';
import Dashboard from './components/layout/dashboard/Dashboard';
import CreateProfile from './components/layout/dashboard/create-profile/CreateProfile';
import EditProfile from './components/layout/dashboard/create-profile/EditProfile';


//check for token
if(localStorage.jwtToken){
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    //logout user
    store.dispatch(logoutUser());
    //todo clear current profile
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            
              
              <Route exact path="/" component={Index}/>
              <Route exact path="/section" component={Section}/>

              <Route exact path="/registration" component={Regist}/>
              <Route exact path="/login" component={Login}/>
              
              <Switch>
               <PrivateRoute exact path="/dashboard" component={Dashboard}/>                
              </Switch>
              <Switch>
               <PrivateRoute exact path="/create-profile" component={CreateProfile}/>                
              </Switch>
              <Switch>
               <PrivateRoute exact path="/edit-profile" component={EditProfile}/>                
              </Switch>


            <FooterBar/>
          </div>        
        </Router>
      </Provider>


    );
  }
}

export default App;
