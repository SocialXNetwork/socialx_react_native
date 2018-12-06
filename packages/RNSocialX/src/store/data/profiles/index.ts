export { default as reducer } from './reducer';
export { IState, IAction, IUsernameInput } from './Types';
export {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IProfileData,
	IFriendData,
	IRemoveFriendInput,
	IFindFriendsSuggestionsInput,
	IUpdateProfileInput,
	IPostArrayData,
	IRejectFriendInput,
	IClearFriendResponseInput,
	IClearFriendRequestInput,
} from '@socialx/api-data';
export {
	getCurrentProfile,
	getProfileByUsername,
	acceptFriend,
	addFriend,
	updateCurrentProfile,
	getProfilesByPosts,
	removeFriend,
	getProfilesByUsernames,
	rejectFriend,
	clearFriendResponse,
	getCurrentFriends,
	clearFriendRequest,
} from './actions';
