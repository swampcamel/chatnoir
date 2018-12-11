import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import AddUserForm from './AddUserForm';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Lobby from './Lobby';
import ChatRoom from './ChatRoom';
import Error404 from './Error404';

const GET_USERS = gql`
  {
    listUsers{
      items{
        userName
      }
    }
  }
`;




class App extends Component {
  render() {
    return (
      <div>
      <Query query={GET_USERS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          console.log(data)
          return (
            <div>
              <select>
                {data.listUsers.items.map(item => (
                  <option key={item.userName} value={item.userName}>
                    {item.userName}
                  </option>
                ))}
              </select>
            </div>
          );
        }}
      </Query>
      <AddUserForm />
      <Switch>
          <Route exact path='/' render={()=><Home />} />
          <Route path='/login' render={()=><Login />} />
          <Route path='/signup' render={()=><SignUp />} />
          <Route path='/Lobby' render={()=><Lobby />} />
          <Route path='/chatroom' render={()=><ChatRoom />} />
          <Route component={Error404} />
        </Switch>
    </div>
    );
  }
}

export default App;
