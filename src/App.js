import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import gql from "graphql-tag";
import Login from './Login';
import SignUp from './SignUp';
import Lobby from './Lobby';
import ChatRoom from './ChatRoom';
import Error404 from './Error404';
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
Amplify.configure(aws_exports);



class App extends Component {
  constructor(props) {
    super(props);
  }
  signOut() {
    Auth.signOut({ global: true }).then(data => console.log(data)).catch(err => console.log(err));
  }
  logUser() {
    Auth.currentAuthenticatedUser({
  bypassCache: false}).then(user => console.log(user)).catch(err => console.log(err))
  }
  render() {
    console.log(this.props.authData.username)
    return (
      <div>
      <br/>
      <button type="button" onClick={() => this.signOut()}>Sign Out</button>
      <button onClick={() => this.logUser()}>Log user</button>
    </div>
    );
  }
}

export default withAuthenticator(App);
