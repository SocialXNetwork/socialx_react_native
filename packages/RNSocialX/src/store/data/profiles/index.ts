export { default as reducer } from './reducer';
export { IState, IAction, IProfiles, IFriends, IProfile, ISearchInput } from './Types';

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
	rejectFriend,
	clearFriendResponse,
	getCurrentFriends,
	addPostsToProfile,
	removePostFromProfile,
	searchForProfiles,
} from './actions';
