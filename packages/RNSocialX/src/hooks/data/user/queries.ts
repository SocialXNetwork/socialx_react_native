import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

const currentUserQuery = (prop: string) => gql`
	{
		currentUser {
			${prop}
		}
	}
`;

const currentUserFriendsQuery = (prop: string) => gql`
	{
		currentUserFriends {
			${prop}
		}
	}
`;

export const useCurrentUser = (properties: string) =>
	useQuery<{ currentUser: IGraphqlTypes.IUser }>(currentUserQuery(properties));
export const userCurrentUserFriends = (properties: string) =>
	useQuery<{ currentUserFriends: IGraphqlTypes.IUser[] }>(currentUserFriendsQuery(properties));
