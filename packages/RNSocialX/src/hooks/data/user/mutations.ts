import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

interface IAccessReturn {
	_id: string;
	token: string;
}

interface IMutateReturn {
	_id: string;
}

const loginMut = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			_id
			token
		}
	}
`;

const registerMut = gql`
	mutation register($args: RegisterTypeInput!) {
		register(args: $args) {
			_id
			token
		}
	}
`;

const addFriendMut = gql`
	mutation addFriend($userId: ID!) {
		addFriend(userId: $userId) {
			_id
		}
	}
`;

const removeFriendMut = gql`
	mutation removeFriend($userId: ID!) {
		removeFriend(userId: $userId) {
			_id
		}
	}
`;

const acceptFriendRequestMut = gql`
	mutation acceptFriend($reqId: ID!) {
		acceptFriendRequest(requestId: $reqId)
	}
`;

const declineFriendRequestMut = gql`
	mutation declineFriend($reqId: ID!) {
		declineFriendRequest(requestId: $reqId)
	}
`;

export const useLogin = useMutation<
	{ login: IAccessReturn },
	IGraphqlTypes.ILoginOnMutationArguments
>(loginMut);

export const useRegister = useMutation<
	{ register: IAccessReturn },
	IGraphqlTypes.IRegisterOnMutationArguments
>(registerMut);

export const useAddFriend = useMutation<
	{ addFriend: IMutateReturn },
	IGraphqlTypes.IAddFriendOnMutationArguments
>(addFriendMut);

export const useRemoveFriend = useMutation<
	{ removeFriend: IMutateReturn },
	IGraphqlTypes.IRemoveFriendOnMutationArguments
>(removeFriendMut);

export const useAcceptFriend = useMutation<
	{ acceptFriendRequest: boolean },
	IGraphqlTypes.IAcceptFriendRequestOnMutationArguments
>(acceptFriendRequestMut);

export const useDeclineFriend = useMutation<
	{ declineFriendRequest: boolean },
	IGraphqlTypes.IDeclineFriendRequestOnMutationArguments
>(declineFriendRequestMut);
