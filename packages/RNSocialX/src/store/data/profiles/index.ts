export { default as reducer } from './reducer';
export { IState, IAction, IProfiles, IFriends, IProfile, ISearchInput, IAliasInput } from './Types';

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
} from './actions';
