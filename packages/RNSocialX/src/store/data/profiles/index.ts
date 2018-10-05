export { default as reducer } from './reducer';
export { IState, IAction, IUsernameInput } from './Types';
export {
	IAcceptFriendInput,
	IAddFriendInput,
	ICreateProfileInput,
	IProfileData,
	IRemoveFriendInput,
	IUpdateProfileInput,
	IPostArrayData,
} from '@socialx/api-data';
export {
	getCurrentProfile,
	getProfileByUsername,
	acceptFriend,
	addFriend,
	getProfilesByPosts,
	removeFriend,
} from './actions';
