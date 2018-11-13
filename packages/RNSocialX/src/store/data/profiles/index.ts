export { default as reducer } from './reducer';
export { IState, IAction, IUsernameInput } from './Types';
export {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IProfileData,
	IRemoveFriendInput,
	IFindFriendsSuggestionsInput,
	IUpdateProfileInput,
	IPostArrayData,
	IRejectFriendInput,
	IClearFriendResponseInput,
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
} from './actions';
