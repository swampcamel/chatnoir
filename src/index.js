import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import { HashRouter, Link } from 'react-router-dom';
import catSVG from './assets/Group.svg';
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

      <div style={{display: 'flex', width:'100%', alignItems: 'center', flexDirection: 'column', justifyContent:'space-around', height: '400px' }}>
        <style jsx>{`
          @keyframes coolcat {
            0% {
              transform: rotate(0deg) scale(2);
            }
            100% {
              transform: rotate(360deg) scale(2);
            }
          }
        `}</style>
          <img style={{padding: '8px', marginTop: '150px', transform: 'scale(2)', animation: 'coolcat 5s linear infinite'}} src={catSVG}/>
          <h2>Chat Noir</h2>
      </div>
    <Rehydrated>
      <HashRouter>
        <App federated={fedConfig}/>
      </HashRouter>
    </Rehydrated>
  </ApolloProvider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));

export default client;
