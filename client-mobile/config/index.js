import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {BASE_URL_ORCHESTRATOR} from '../baseUrl'

const client = new ApolloClient({
    uri: BASE_URL_ORCHESTRATOR,
    cache: new InMemoryCache(),
});


export default client