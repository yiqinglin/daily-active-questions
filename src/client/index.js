import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/components/App';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from "apollo-link-http";

const link = createHttpLink({
  uri: "/graphql",
  credentials: 'same-origin'
});
const client = new ApolloClient({ link });

const app = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
const rootElement = document.getElementById('app');

ReactDOM.render(app, rootElement);
