export { default as reducer } from './reducer';
export {
	IState,
	IAction,
	IUsernameInput,
	ISearchProfilesByFullNameInput,
} from './Types';
export {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IProfileData,
	IRemoveFriendInput,
	IFindFriendsSuggestionsInput,
	IUpdateProfileInput,
	IPostArrayData,
} from '@socialx/api-data';
export {
	getCurrentProfile,
	getProfileByUsername,
	acceptFriend,
	searchProfilesByFullName,
	findFriendsSuggestions,
	addFriend,
	updateCurrentProfile,
	getProfilesByPosts,
	removeFriend,
} from './actions';
