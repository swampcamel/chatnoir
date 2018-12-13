import React, { Component } from 'react';
import { Button, Input } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import catSVG from './assets/Group.svg';
import {Link} from 'react-router-dom';
import client from './index.js'

const Card = styled.div`
height: 800px;
background-color: #1A1A1A;
margin: 20px;

  ${props =>
  props.primary &&
  css`
  min-width: 500px;
  `}
  ${props =>
    props.secondary &&
    css`
    min-width: 800px;
    `}
  `;

const CardHeader = styled.div`
width: 100%;
height: 60px;
background-color: #549EC5;
border-top-left-radius: 5px;
border-top-right-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
`;

const BottomDiv = styled.div`
width: 1350px;
margin: 0 auto;
height: 60px;
background-color: red;
display: flex;
`;

const H1 = styled.h1`
font-size: 26px;
color: whitesmoke;
padding: 10px;
margin: 0;
`;

const Div = styled.div`
display: flex;

  ${props =>
    props.column &&
    css`
    flex-direction: column;
    `}
    ${props =>
      props.row &&
      css`
      flex-direction: row;
      margin: 0 auto;
      `}
  `;

const Span = styled.span`
${props =>
  props.white &&
  css`
  color: white;
  padding-left: white;
  `}
  `;


  const GET_USERS = gql`
  {
    users{
      name
    }
  }
  `;
  const GET_ROOMS= gql`
  {
    rooms{
      name
      id
    }
  }
  `;
//   const CREATE_ROOM = gql`
//   mutation createRoom($name: String!, $users:[User!]) {
//     createRoom(data: {
//       name: $name,
//       users: {
//
//       }
//     }) {
//       id
//       type
//     }
//   }
// `;
class Lobby extends React.Component{
  constructor(props) {
    super(props);
    this.state = {selectedRoom: null}
    this.setRoomToJoin = this.setRoomToJoin.bind(this);
  }

  loadUsersToRoom(activeUser, selectedUsers) {
    console.log("not a function")
  }

  setRoomToJoin(roomName, roomid) {
    console.log(roomName)
    this.setState({selectedRoom: roomName});
    console.log(this.state.selectedRoom)
    client.writeData({ data: { currentRoomID: roomid } })
  }

  render(){
    console.log(this)
    return(
      <Div column>
        <Div row>
          <style jsx>{`
            button{
              width: 100px;
              height: 40px;
              background-color: #1A1A1A;
              border-radius: 5px;
              color: whitesmoke;
              font-size: 14px;
              border: 1px solid whitesmoke;
              margin-top: 20px;
            }
          `}</style>
          <Card primary>
            <CardHeader>
              <H1>Join Existing Room</H1>
            </CardHeader>
            <div style={{padding: '20px'}}>
            <form>
            <Query query={GET_ROOMS}>
              {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                console.log(data)
                return (
                  <div>
                    {data.rooms.map((item, index) => (
                      <div key={index}>
                        <input onClick={(event) => this.setRoomToJoin(event.target.value, item.id)} type="radio" name="roomList" value={item.name}/> <Span white >{item.name}'s Room</Span>
                      </div>
                    ))}
                  </div>
                );
              }
            }
            </Query>
            <Link to={`/chatroom/${this.state.selectedRoom}`}>
          <button type="button" onClick={() => console.log("hello")}>Join Room</button></Link>
          </form>
        </div>
          </Card>
          <form>
            <Card secondary>
              <CardHeader>
                <H1>Create New Room</H1>
              </CardHeader>
              <div style={{padding: '20px'}}>
              <Query query={GET_USERS}>
                {({ loading, error, data }) => {
                  if (loading) return "Loading...";
                  if (error) return `Error! ${error.message}`;
                  console.log(data)
                  return (
                    <div>
                      {data.users.map((item, index) => (
                        <div key={index}>
                          <input type="checkbox" value={item.name}/> <Span white >{item.name}</Span>
                        </div>
                      ))}
                    </div>
                  );
                }
              }
            </Query>
            {/* <Mutation mutation={ADD_TODO}>
              {(createRoom, { data }) => (
                <div>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      createRoom({ variables: { type: input.value } });
                      input.value = "";
                    }}
                  >
                    <input
                      ref={node => {
                        input = node;
                      }}
                    />
                    <button type="submit">Add Todo</button>
                  </form>
                </div>
              )}
            </Mutation> */}
            <button type="button" onClick={() => console.log("hello")}>Create Room</button>
          </div>
          </Card>
        </form>
      </Div>
    </Div>
  )
}
}

export default Lobby;
