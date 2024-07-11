import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import authService from './utils/auth'

const authLink = setContext((_, {headers}) => {
  const token = authService.getToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const httpLink = createHttpLink({
  uri: "/graphql",
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
