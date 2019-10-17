import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import Main from '../Main';
import Header from '../Login/Header'
import { GoogleLogin } from 'react-google-login';
import LogoDC3 from 'assets/images/dc3_logo.jpg';
import About from "../Login/About";



//https://medium.com/@alexanderleon/implement-social-authentication-with-react-restful-api-9b44f4714fa

export default class Login extends Component {
  constructor(props) {
    super(props);


    if (sessionStorage.getItem('userAuth')) {
      var userObj = JSON.parse(sessionStorage.getItem('userAuth'));
      var token = JSON.parse(sessionStorage.getItem('userAuthToken'));
      this.state = {
        email: userObj.Email,
        password: "",
        isAuthenticated: true,
        user: userObj, 
        token: token
      };
    } else {
      this.state = {
        email: "",
        password: "",
        isAuthenticated: false,
        user: null, 
        token: ''
      };
    }
  };

  logout = () => {
    this.setState({ isAuthenticated: false, token: '', user: null })
  };


  googleResponse = (response) => {

    sessionStorage.setItem('googleAuth', JSON.stringify(response));
    
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });

    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };

    //send the request to back-end, get the token
    fetch('http://localhost:8000/auth/google', options).then(resp => {

      if (resp.status < 400) {
        const token = resp.headers.get('x-auth-token');
        resp.json().then(user => {
          if (token) {
            sessionStorage.setItem('userAuth',JSON.stringify(user));
            sessionStorage.setItem('userAuthToken',JSON.stringify(token));

            this.setState({ isAuthenticated: true, user, token });            
          }
        });
      }
    });

  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  

  render() {

  
    
    let content = this.state.isAuthenticated ?
      (
        <div>
          <Main userInfo={this.state.user} logout={this.logout}/>          
        </div>
      ) :
      (
            
            <div className="Login">
              <Header /> 
              <img src={LogoDC3} className="logo" pullright /> 
              <GoogleLogin 
                clientId="204559914410-83fsef9pb97suhi6o550uqeo2utb8591.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.googleResponse}
                onFailure={this.googleResponse}
              />     
              <About />
              </div>  
  
  
  
      );

          
    return (
      
        <div>
      {content}
      </div>

    );
  }
}

