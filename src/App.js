import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'


import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Footer from './components/layout/Footer'

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';


// Check for Token
if(localStorage.jwtToken) {
  // Set Auth Token Header
  setAuthToken(localStorage.jwtToken)

  // Decode Token and Get User Info and Exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded))


  // Check for Expired Token
  const currentTime = Date.now() / 1000
  
  if(decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser())
    
    // TODO: Clear Current Profile

    // Redirect to Login
    window.location.href = '/login'
  }
}


function App() {
  return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar />
          
          <Route exact path="/" component={Landing} />

          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
