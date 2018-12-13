import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";



const CREATE_USER = gql`
    mutation CreateUser($userName: String!, $email: String, $password: String!){
      createUser(input:{
        userName: $userName,
        email: $email,
        password: $password,
      }){
        id
        userName
        email
        password
      }
    }
`;

const GET_USERS = gql`
  {
    users{
      name
    }
  }
`;


class AddUserForm extends Component {
  render() {
    let userName;
    let email;
    let password;

    return (
      <Mutation mutation={CREATE_USER}
        update={(cache, { data: { createUser } }) => {
        const data = cache.readQuery({ query: GET_USERS });

        console.log("TWice?")
        cache.writeQuery({
          query: GET_USERS,
          data: { listUsers: {
            items: [...data.listUsers.items, createUser],
            __typename: "UserConnection" }}
        });
      }}>
      {(createUser, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log(email.value)
              createUser({ variables: { userName: userName.value, email: email.value, password: password.value} });
            }}>
            User:
            <input
              ref={input => {
                userName = input;
              }}
            />
            Email:
            <input
              ref={input => {
                email = input;
              }}
            />
            Password:
            <input
              ref={input => {
                password = input;
              }}
            />
            <button type="submit">Add Todo</button>
          </form>
        </div>
      )}
    </Mutation>
    );
  }
}

export default AddUserForm;
