import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';

import { HashRouter } from 'react-router-dom';

import appSyncConfig from './appsync';

const client = new AWSAppSyncClient({
  url: "https://vit7hncg2bep3oo6pgahwpwkwi.appsync-api.us-west-2.amazonaws.com/graphql",
  region: "us-west-2",
  auth: {
    type: "API_KEY",
    apiKey: "da2-vg6xipydvnas3jme7dvowftbwe",
  },
  disableOffline: true
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <HashRouter>
        <App />
      </HashRouter>
    </Rehydrated>
  </ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));
