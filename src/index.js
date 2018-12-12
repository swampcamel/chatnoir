import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import { HashRouter } from 'react-router-dom';

import styled, { css } from 'styled-components';


import appSyncConfig from './appsync';

import Amplify from 'aws-amplify';

const client = new AWSAppSyncClient({
  url: "https://vit7hncg2bep3oo6pgahwpwkwi.appsync-api.us-west-2.amazonaws.com/graphql",
  region: "us-west-2",
  auth: {
    type: "API_KEY",
    apiKey: "da2-vg6xipydvnas3jme7dvowftbwe",
  },
  disableOffline: true
});

const fedConfig = {
  google_client_id: '310404652388-70bma0qvhp9ahlgg6v30s99e5moeoov3.apps.googleusercontent.com',
  facebook_app_id: '210734629816256'
}


const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <HashRouter>
        <App federated={fedConfig}/>
      </HashRouter>
    </Rehydrated>
  </ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));

export default client;
