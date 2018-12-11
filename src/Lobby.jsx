import React, { Component } from 'react';
import { Button, Input } from '@material-ui/core';
import styled, { css } from 'styled-components';
import gql from "graphql-tag";
import client from './index.js'
import { Query } from 'react-apollo';

const Card = styled.div`
  height: 800px;
  background-color: #1A1A1A;
  margin: 20px;


  ${props =>
    props.primary &&
    css`
      width: 500px;
    `}
  ${props =>
    props.secondary &&
    css`
      width: 1000px;
    `}
`;

const CardHeader = styled.div`
  width: 100%;
  height: 60px;
  background-color: #2F2F2F;
  text-align: center;
`;

const H1 = styled.h1`
  font-size: 26px;
  color: whitesmoke;
  padding: 10px;
  margin: 0;
`;

const Div = styled.div`
  display: flex;
`;

const GET_CURRENTUSER = gql`
  {
    currentUser @client
  }
`;

async function getCurrentUser(){
  const { data } = await client.query({
  query: gql`{
    currentUser @client
  }`,
});
return data
}


class Lobby extends React.Component{



  render(){
    let user = null;
    getCurrentUser().then( data => {
      user = data.currentUser;
    });
    return(
      <Div>
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
       <Card primary>
         <CardHeader>
           <H1>{user}</H1>
         </CardHeader>
         <Input type='text' placeholder='Enter Room Name' />

       </Card>
       <Card secondary>
         <CardHeader>
           <H1>Create New Room</H1>
         </CardHeader>
       </Card>
     </Div>
    )
  }
}

export default Lobby;
