import React, { Component } from 'react';
import { Button, Input } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { Query, Mutation } from "react-apollo";
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

const P = styled.p`
  color: white;
  margin-bottom: 20px;
`;
const UserName = styled.span`
  color: teal;
  margin-bottom: 20px;
`;
const P2 = styled.p`
  color: white;
  text-align: right;
  margin-bottom: 20px;
`;

const InputBox = styled.textarea`
  margin: 0 auto;
  display: block;
  height: 65px;
  width: 94%;
  padding: 10px;
  font-size: 14px;
  background-color: #435772;
  border: none;
  outline: none;
  color: white;
`

const GET_MESSAGES = gql`
{
  messages {
    content
      user{
        id
        name
      }
    }
}`
const CREATE_MESSAGE = gql`
  mutation createMessage($content: String!, $userid: ID, $room: ID) {
    createMessage(data: {
      content: $content,
      room: { connect: { id: $room }},
      user: { connect: { id: $userid}}
    }) {
      id
      content
      user {
        id
        name
      }
    }
  }
`;

const GET_CURRENTINFO = gql`
{
  currentUserID @client
  currentRoomID @client
}
`;

class ChatRoom extends React.Component{
  constructor(props) {
    super(props);
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
            ::-webkit-scrollbar {
              width: 5px;
            }
            ::-webkit-scrollbar-track {
              background: #1A1A1A;
            }
            ::-webkit-scrollbar-thumb {
              background: #435772;
            }
          `}</style>
          <Card secondary>
            <CardHeader>
              <H1>You and Your Buddies</H1>
            </CardHeader>
            <div style={{padding: '20px', height: '73%', overflowY: 'scroll', marginBottom:'20px'}}>
              <Query query={GET_MESSAGES}>
                {({ loading, error, data }) => {
                  if (loading) return "Loading...";
                  if (error) return `Error! ${error.message}`;
                  console.log(data)
                  return (
                    <div>
                      {data.messages.map((message, index) => (
                        <div key={index}>

                          <P><UserName>{message.user.name}: </UserName>{message.content}</P>
                        </div>
                      ))}
                    </div>
                  );
                }
              }
              </Query>

              <Query query={GET_CURRENTINFO}>
                {({ loading, error, data }) => {
                  let info = data;
                  let input;
                  return(
                <Mutation mutation={CREATE_MESSAGE} update={(cache, {data: {createMessage}}) => {
                  const messageList = cache.readQuery({query: GET_MESSAGES});
                  console.log(messageList)
                  cache.writeQuery({
                    query: GET_MESSAGES,
                    data: { messages: [...messageList.messages, createMessage]}, __typename: "MessageConnection"
                  })
                  console.log(cache.readQuery({query: GET_MESSAGES}))
                }}>
                  {(createMessage) => (
                    <div>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          console.log(data)
                          createMessage({ variables: { content: input.value, userid: info.currentUserID, room: info.currentRoomID} });
                          input.value = "";
                        }}
                      >
                        <input
                          ref={node => {
                            input = node;
                          }}
                        />
                        <button type="submit">Send</button>
                      </form>
                    </div>
                  )}
                </Mutation>
              )
              }}
              </Query>
            </div>
            <InputBox></InputBox>
          </Card>
      </Div>
    </Div>
  )
}
}

export default ChatRoom;
