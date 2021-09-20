import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import './App.css';
import { Button } from 'react-bootstrap';
import Header from './component/header/Login';
import Notify from './component/notify/Notify';
import React, { Component, history } from 'react';
import Login from './component/header/Login';


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
        login: false,
        config: {}
    }
  }
// Login button 
  submit = (e) =>{
    e.preventDefault()
    let {config} = this.state
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: config.email, password: config.password })
    };
    fetch('http://35.201.2.209:8000/login', requestOptions)
        .then(response => {
            if(response.status === 200) {
                localStorage.setItem('user_login', true)
                this.setState({login:true})
            }
        })    
  }

  inputHandler = (e) =>{
    let {config} = this.state
    config[e.target.name] = e.target.value
    this.setState({config:config})
  }

  componentDidMount() {
    let user_login = localStorage.getItem('user_login')     
    if(user_login !== 'false'){
      this.setState({login:true})
    }
      
  }
  requireAuth = () => {
    console.log('request outh')
  }

  logoutHandler = () => {
    localStorage.setItem('user_login', false)     
    this.setState({login:false})
  }

  render() {
    let {config, login} = this.state
    
    return (
      <Router>
        <Switch>
          <Route exact path="/">
             { !login && (
               <>
                  <Login 
                  submit={this.submit}
                  inputHandler={this.inputHandler}
                  config={config}
                  onEnter={this.requireAuth}
                />
               </>
             )}

             {login && (
               <>
                <Redirect to="/notify" />
               </>
             )}
          </Route>
          
          <Route exact path="/notify" >
        
            {
              (() => {
                if(login){
                  return(
                    <Notify 
                    logoutHandler={this.logoutHandler}
                    />
                  )
                }else{
                  return(
                    <Redirect to="/" />
                  )
                }
              })()
            }
          </Route>
        
        </Switch>
      </Router>
    )
  }
}

export default App;
