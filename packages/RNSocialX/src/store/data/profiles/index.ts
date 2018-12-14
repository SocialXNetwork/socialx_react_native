export { default as reducer } from './reducer';
export {
	IState,
	IAction,
	IProfiles,
	IFriends,
	IProfile,
	ISearchInput,
	IAliasInput,
	IUpdateProfileInput,
} from './Types';

export {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IProfileData,
	IRemoveFriendInput,
	IFindFriendsSuggestionsInput,
	IRejectFriendInput,
	IClearFriendResponseInput,
	IClearFriendRequestInput,
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
	undoRequest,
	clearSearchResults,
	searchForProfilesLocally,
} from './actions';
