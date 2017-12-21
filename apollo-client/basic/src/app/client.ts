import { ApolloClient, createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({ networkInterface })

export function provideClient(): ApolloClient {
  return client
}
