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
	IUpdateProfileInput,
	ISearchProfilesInput,
	IPostArrayData,
} from '@socialx/api-data';
export {
	getCurrentProfile,
	getProfileByUsername,
	acceptFriend,
	searchProfilesByFullName,
	addFriend,
	getProfilesByPosts,
	removeFriend,
} from './actions';
