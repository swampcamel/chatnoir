import React, { Component } from 'react';
import { Button, Input } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import catSVG from './assets/Group.svg';

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


  const GET_CURRENTUSER = gql`
  {
    currentUser @client
  }
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
  const GET_ROOMS= gql`
  {
    listRooms{
      items{
        roomName
      }
    }
  }
  `;

          // const CREATE_ROOM = gql`
          //   mutation CreateRoom($userName: String!){
          //     createRoom( input: { userName: $userName } ){
          //       userName
          //     }
          //   }
          // `
class Lobby extends React.Component{
  constructor(props) {
    super(props);
  }

  loadUsersToRoom(activeUser, selectedUsers) {
    console.log("not a function")
  }

  render(){
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
                    {data.listRooms.items.map((item, index) => (
                      <div key={index}>
                        <input type="radio" name="roomList" value={item.roomName}/> <Span white >{item.roomName}</Span>
                      </div>
                    ))}
                  </div>
                );
              }
            }
            </Query>
          <button type="button" onClick={() => console.log("hello")}>Join Room</button>
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
                      {data.listUsers.items.map((item, index) => (
                        <div key={index}>
                          <input type="checkbox" value={item.userName}/> <Span white >{item.userName}</Span>
                        </div>
                      ))}
                    </div>
                  );
                }
              }
            </Query>
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
