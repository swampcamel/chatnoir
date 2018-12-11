import React, { Component } from 'react';
import { Button, Input } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Query } from "react-apollo";
import gql from 'graphql-tag';

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


const GET_USERS = gql`
  {
    listUsers{
      items{
        userName
      }
    }
  }
`;


const Div = styled.div`
  display: flex;
`
class Lobby extends React.Component{

  logUser(){
    console.log("user");
  }

  render(){
    return(
      <Div onClick={this.logUser}>
       <Card primary>
         <CardHeader>
           <H1>Create New Room</H1>
         </CardHeader>

       </Card>
       <Card secondary>
         <CardHeader>
           <H1>Create New Room</H1>
         </CardHeader>
       </Card>


       <Query query={GET_USERS}>
         {({ loading, error, data }) => {
           if (loading) return "Loading...";
           if (error) return `Error! ${error.message}`;
           console.log(data)

           return (
             <div>
                 {data.listUsers.items.map((item, index) => (
                   <p key={index}>{item.userName}</p>
                 ))}

             </div>
           );
         }}
       </Query>
     </Div>
    )
  }
}

export default Lobby;

{/* <Button variant="contained" color="primary">
  Lobb
</Button> */}
