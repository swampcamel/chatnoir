import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import gql from "graphql-tag";
import Login from './Login';
import Lobby from './Lobby';
import ChatRoom from './ChatRoom';
import Error404 from './Error404';
import Amplify, { Auth } from 'aws-amplify';
import client from './index.js'
import { withAuthenticator } from 'aws-amplify-react';
import { ApolloConsumer } from 'react-apollo';
import styled, { css } from 'styled-components';
import catSVG from './assets/Group.svg';
import { Query } from "react-apollo";
import AmplifyCustomUi from 'aws-amplify-react-custom-ui'


async function updateUserList(){
  const { data } = await client.query({
    query: gql`
    {
      users{
        name
        id
      }
    }
    `,
  });
  return data;
}

const CREATE_USER = gql`
mutation CreateUser($userName: String!){
  createUser( data: { name: $userName } ){
    name
  }
}
`

const H1 = styled.h1`
font-size: 26px;
color: whitesmoke;
padding: 10px;
margin: 0;
`;


async function mutateUserList(currentUser){
  const { data } = await client.mutate({
    mutation: CREATE_USER,
    variables: { userName: currentUser},
  });
  return data;
}

const Header = styled.div`
width: 100%;
height: 70px;
background-color: #435772;
display: flex;
align-items: center;
justify-content: space-between;

`;

const Button = styled.button`
width: 100px;
height: 40px;
background-color: #435772;
border-radius: 5px;
color: whitesmoke;
font-size: 14px;
border: 1px solid whitesmoke;
margin-top: 0;
`;

const GET_CURRENTUSER = gql`
{
  currentUser @client
}
`;


class App extends Component {
  constructor(props) {
    super(props);
  }

  signOut() {
    Auth.signOut({ global: true }).then(() => this.props.onStateChange('signedOut', null)).catch(err => console.log(err));
  }

  logUser() {
    Auth.currentAuthenticatedUser({ bypassCache: false })
    .then(user => console.log(user))
    .catch(err => console.log(err))
  }


  render() {
    let currentUser = this.props.authData.username;
    client.writeData({ data: { currentUser: currentUser } })
    updateUserList().then(data => {
      let userArray = data.users;
      const result = userArray.filter(user => user.name == currentUser);
      if (result[0]){
        console.log(result[0].id)
        client.writeData({ data: { currentUserID: result[0].id } })
      }
      if(result.length <= 0){
        console.log(result)
        mutateUserList(currentUser);
      }
    });

    return (
      <div>
        <Header>
          <div style={{display: 'flex',  width: '100%', justifyContent: 'space-between', margin: '0 auto', padding: '0 32px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <img style={{padding: '8px'}} src={catSVG}/>
              <Link style={{textDecoration: 'none', marginLeft: '20px'}} to="/">
              <H1>Le Chat Noir</H1>
            </Link>
            </div>
            <style jsx>{`
              H1:hover{
                color: #549EC5;
              }
              Button:hover{
                border: 1px solid #549EC5;
                color: #549EC5;
              }
              `}</style>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Link to="/" style={{textDecoration: 'none'}}>
                <Query query={GET_CURRENTUSER}>
                  {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    console.log(data)
                    return (
                      <H1>
                        { data.currentUser }
                      </H1>
                    );
                  }}
                </Query>
              </Link>
              <Button type="button" onClick={() => this.signOut()}>Sign Out</Button>
            </div>
          </div>
        </Header>
        <Switch>
          <Route exact path='/' render={()=><Lobby />} />
          <Route path='/chatroom/:id' render={()=><ChatRoom />} />
          <Route component={Error404} />
        </Switch>
      </div>

    );
  }
}

export default AmplifyCustomUi.withAuthenticator(App);
