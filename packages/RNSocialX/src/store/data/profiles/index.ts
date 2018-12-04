export { default as reducer } from './reducer';
export { IState, IAction, IProfiles, IFriends, IProfile } from './Types';

export {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IProfileData,
	IRemoveFriendInput,
	IFindFriendsSuggestionsInput,
	IUpdateProfileInput,
	IRejectFriendInput,
	IClearFriendResponseInput,
} from '@socialx/api-data';

export {
	getCurrentProfile,
	getProfileByAlias,
	acceptFriend,
	addFriend,
	updateCurrentProfile,
	getProfilesByPosts,
	removeFriend,
	getProfilesByUsernames,
	rejectFriend,
	clearFriendResponse,
	getCurrentFriends,
	addPostsToProfile,
	removePostFromProfile,
} from './actions';
