import React, { SFC } from 'react';
import { AsyncStorage } from 'react-native';

import { ApolloProvider as ApolloProviderOrg } from 'react-apollo';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({
	uri: '',
});

const authLink = setContext(async (_, { headers }) => {
	const token = await AsyncStorage.getItem('jwtToken');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

export const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default (props: any) => (
	<ApolloProviderOrg client={apolloClient}>{props.children}</ApolloProviderOrg>
);
