
import React, { Component } from "react";
import * as aws_amplify_react from "aws-amplify-react";
import Amplify, { Auth } from 'aws-amplify';
import AmplifyCustomUi from 'aws-amplify-react-custom-ui'
import aws_exports from './aws-exports';
import SignUp from './SignUp';
import SecureApp from "./SecureApp"

Amplify.configure(aws_exports);
AmplifyCustomUi.configure(aws_amplify_react);

class App extends Component {
  componentWillMount() {
    AmplifyCustomUi.setSignIn(SignUp);
  }

  render() {
    return <SecureApp />;
  }
}

export default App;
