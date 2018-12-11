import React, { Component } from 'react';
import { Button, Input } from '@material-ui/core';
import styled, { css } from 'styled-components';

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

{/* <Button variant="contained" color="primary">
  Lobb
</Button> */}
