import ApolloClient from 'apollo-boost';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({ uri: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql' });

const ApolloApp = (AppComponent: typeof App) => (
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
);

ReactDOM.render(
  ApolloApp(App),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
